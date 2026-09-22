import React, { useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiAlertCircle, FiArrowUpRight, FiCheckCircle, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { links, site } from "../data/site";
import { ExternalLink, Reveal, SectionHeader } from "./ui";

const EMPTY = { name: "", email: "", subject: "", message: "", company: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MESSAGE_MIN = 20;
const MESSAGE_MAX = 5000;

// Mirrors api/_lib/validate.js so users get instant feedback; the server re-validates.
function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.subject.trim().length < 3) e.subject = "Please add a short subject.";
  if (v.message.trim().length < MESSAGE_MIN) e.message = `Please write at least ${MESSAGE_MIN} characters.`;
  else if (v.message.trim().length > MESSAGE_MAX) e.message = `Please keep your message under ${MESSAGE_MAX} characters.`;
  return e;
}

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-[13px] text-danger">
          <FiAlertCircle aria-hidden="true" className="shrink-0" />
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-faint">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [serverMessage, setServerMessage] = useState("");
  const formRef = useRef(null);
  const statusRef = useRef(null);

  const update = (key) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const focusFirstError = (errs) => {
    const first = ["name", "email", "subject", "message"].find((k) => errs[k]);
    if (first) formRef.current?.querySelector(`#contact-${first}`)?.focus();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const clientErrors = validate(values);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length) {
      focusFirstError(clientErrors);
      return;
    }

    setStatus("sending");
    setServerMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        setValues(EMPTY);
        setErrors({});
      } else {
        if (data.fields) {
          setErrors(data.fields);
          focusFirstError(data.fields);
        }
        setStatus("error");
        setServerMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerMessage("Couldn't reach the server. Check your connection and try again.");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="card flex flex-col items-start p-6 sm:p-8"
      >
        <FiCheckCircle size={28} className="text-success" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold text-ink">Message sent — thank you.</h3>
        <p className="mt-2 max-w-prose leading-relaxed text-muted">
          It's in my inbox and I'll reply to the email address you provided. If it's urgent, WhatsApp is the
          quickest way to reach me.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" className="btn-secondary" onClick={() => setStatus("idle")}>
            Send another message
          </button>
          <ExternalLink href={links.whatsapp} className="btn-ghost">
            <FaWhatsapp aria-hidden="true" /> Chat on WhatsApp
          </ExternalLink>
        </div>
      </div>
    );
  }

  const sending = status === "sending";
  const describedBy = (key, hasHint) =>
    errors[key] ? `contact-${key}-error` : hasHint ? `contact-${key}-hint` : undefined;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card relative min-w-0 p-6 sm:p-8" aria-labelledby="form-title">
      <h3 id="form-title" className="text-lg font-semibold text-ink">
        Send a message
      </h3>
      <p className="mt-1 text-sm text-muted">Goes straight to my inbox. All fields are required.</p>

      {status === "error" && serverMessage && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-5 flex gap-2.5 rounded-lg border border-danger/30 bg-danger/[0.06] p-3.5 text-sm text-ink"
        >
          <FiAlertCircle className="mt-0.5 shrink-0 text-danger" aria-hidden="true" />
          <span>
            {serverMessage}{" "}
            <a href={links.email} className="link">
              {site.email}
            </a>
          </span>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Name" error={errors.name}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            className="field"
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            maxLength={100}
            required
          />
        </Field>
        <Field id="contact-email" label="Email" error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className="field"
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            maxLength={254}
            required
          />
        </Field>
        <div className="sm:col-span-2">
          <Field id="contact-subject" label="Subject" error={errors.subject}>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              className="field"
              value={values.subject}
              onChange={update("subject")}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={describedBy("subject")}
              maxLength={150}
              placeholder="e.g. Full-stack role, contract project, API work"
              required
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field
            id="contact-message"
            label="Message"
            error={errors.message}
            hint="A few lines about the role or project, timeline and anything else useful."
          >
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              className="field min-h-[150px] resize-y"
              value={values.message}
              onChange={update("message")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={describedBy("message", true)}
              maxLength={MESSAGE_MAX}
              required
            />
          </Field>
        </div>

        {/* Honeypot — hidden from people and assistive tech, attractive to bots. */}
        <div className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0" aria-hidden="true">
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={update("company")}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-faint">Your details are only used to reply to you.</p>
        <button type="submit" className="btn-primary px-5" disabled={sending} aria-busy={sending}>
          {sending && (
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-canvas/40 border-t-canvas"
              aria-hidden="true"
            />
          )}
          {sending ? "Sending…" : "Send message"}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {sending ? "Sending your message" : ""}
      </p>
    </form>
  );
}

const channels = [
  {
    label: "Email",
    value: site.email,
    href: links.email,
    icon: FiMail,
    external: false,
  },
  {
    label: "WhatsApp",
    value: `Chat on WhatsApp · ${links.whatsappDisplay}`,
    href: links.whatsapp,
    icon: FaWhatsapp,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "david-smart-bamidele",
    href: links.linkedin,
    icon: FiLinkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: "davidgraphix",
    href: links.github,
    icon: FiGithub,
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeader
          index="07"
          eyebrow="Contact"
          id="contact-title"
          title="Let's work together."
          lead="Hiring for a full-stack or .NET role, or need a web application, API or admin system built? Tell me about it."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="min-w-0 lg:col-span-7">
            <ContactForm />
          </Reveal>

          <Reveal delay={80} className="min-w-0 lg:col-span-5">
            <h3 className="eyebrow">Or reach me directly</h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {channels.map(({ label, value, href, icon: Icon, external }) => {
                const content = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-ink">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-ink">{label}</span>
                      <span className="block truncate text-sm text-muted">{value}</span>
                    </span>
                    <FiArrowUpRight
                      aria-hidden="true"
                      className="shrink-0 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    />
                  </>
                );
                const cls = "group flex items-center gap-4 py-4";
                return (
                  <li key={label}>
                    {external ? (
                      <ExternalLink href={href} className={cls}>
                        {content}
                      </ExternalLink>
                    ) : (
                      <a href={href} className={cls}>
                        {content}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-faint">
              WhatsApp opens a regular chat with me — it isn't an automated service. Based in {site.location} (WAT,
              UTC+1).
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
