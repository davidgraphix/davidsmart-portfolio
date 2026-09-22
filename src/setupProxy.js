/**
 * Development only: CRA's dev server loads this file automatically.
 * It mounts the same serverless handler Vercel runs in production, so the
 * contact form works under `npm start`. Put SMTP settings in `.env.local`
 * (see .env.example) — CRA loads them into this Node process, and because they
 * aren't prefixed with REACT_APP_ they are never bundled into the browser.
 */
const contactHandler = require("../api/contact");

module.exports = function setupProxy(app) {
  app.all("/api/contact", (req, res) => {
    contactHandler(req, res).catch((err) => {
      console.error("[contact] unhandled error:", err);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end(JSON.stringify({ ok: false, error: "Unexpected error." }));
      }
    });
  });
};
