/**
 * POST /api/contact — Vercel serverless function.
 *
 * Sends portfolio enquiries by SMTP through Nodemailer. Credentials come only
 * from environment variables and never reach the browser bundle:
 *
 *   EMAIL_HOST      SMTP host              (default: smtp.gmail.com)
 *   EMAIL_PORT      SMTP port              (default: 465 — TLS)
 *   EMAIL_USER      SMTP username          (required)
 *   EMAIL_PASSWORD  SMTP password / app password (required)
 *   CONTACT_TO      Destination inbox      (default: bamideledavidsmart40@gmail.com)
 *
 * In local development the same handler is mounted by src/setupProxy.js.
 */

const nodemailer = require("nodemailer");
const { validateContact } = require("./_lib/validate");

const DEFAULT_TO = "bamideledavidsmart40@gmail.com";

// Best-effort rate limit. Serverless instances don't share memory, so this
// only slows down bursts against a warm instance — it is not a hard guarantee.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buf.length;
    if (size > 20 * 1024) throw new Error("Payload too large");
    chunks.push(buf);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { ok: false, error: "Method not allowed." });
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    return send(res, 400, { ok: false, error: "Invalid request." });
  }

  // Honeypot: real users never see or fill this field. Pretend success for bots.
  if (body && typeof body.company === "string" && body.company.trim() !== "") {
    return send(res, 200, { ok: true });
  }

  const { data, errors, valid } = validateContact(body);
  if (!valid) {
    return send(res, 422, { ok: false, error: "Please check the highlighted fields.", fields: errors });
  }

  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown")
    .split(",")[0]
    .trim();
  if (rateLimited(ip)) {
    return send(res, 429, {
      ok: false,
      error: "Too many messages in a short time. Please try again later or reach me on WhatsApp.",
    });
  }

  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD, CONTACT_TO } = process.env;
  if (!EMAIL_USER || !EMAIL_PASSWORD) {
    console.error("[contact] EMAIL_USER / EMAIL_PASSWORD are not configured.");
    return send(res, 503, {
      ok: false,
      error: "The contact form is temporarily unavailable. Please email me directly or use WhatsApp.",
    });
  }

  const port = Number(EMAIL_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD },
  });

  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    "",
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.6;color:#111">
      <p style="margin:0 0 16px;color:#666;font-size:13px">New message from your portfolio contact form</p>
      <table style="border-collapse:collapse;margin-bottom:16px">
        <tr><td style="padding:2px 16px 2px 0;color:#666">Name</td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:2px 16px 2px 0;color:#666">Email</td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding:2px 16px 2px 0;color:#666">Subject</td><td>${escapeHtml(data.subject)}</td></tr>
      </table>
      <div style="white-space:pre-wrap;border-top:1px solid #eee;padding-top:16px">${escapeHtml(data.message)}</div>
    </div>`;

  try {
    await transporter.sendMail({
      from: { name: "Portfolio contact form", address: EMAIL_USER },
      to: CONTACT_TO || DEFAULT_TO,
      replyTo: { name: data.name, address: data.email },
      subject: `[Portfolio] ${data.subject}`,
      text,
      html,
    });
    return send(res, 200, { ok: true });
  } catch (err) {
    console.error("[contact] sendMail failed:", err && err.message);
    return send(res, 502, {
      ok: false,
      error: "Your message couldn't be sent just now. Please try again, or email me directly.",
    });
  }
};
