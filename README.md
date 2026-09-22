# David Smart — Portfolio

Personal portfolio for David Smart, Full-Stack Software Developer (Lagos, Nigeria).

Live: https://davidsmart-portfolio-react.vercel.app/

## Stack

- React 18 (Create React App) + Tailwind CSS 3
- Vercel serverless function (`api/contact.js`) + Nodemailer for the contact form
- No animation library — scroll reveals use `IntersectionObserver` + CSS and respect `prefers-reduced-motion`
- Light and dark themes follow the OS setting (CSS variables in `src/index.css`)

## Structure

```
api/
  contact.js            POST /api/contact — validation, honeypot, rate limit, Nodemailer
  _lib/validate.js      Server-side validation (the trusted copy)
public/
  index.html            SEO, Open Graph, JSON-LD
  og-image.png          Social preview image (1200×630)
  David-Smart-Full-Stack-Software-Developer-CV.pdf   ← add the CV here (see below)
src/
  data/site.js          Name, links, email, WhatsApp, CV filename
  data/projects.js      Featured case studies, more projects, earlier builds
  data/profile.js       Experience, stack, architecture layers, capabilities
  components/           Page sections (Hero, Work, Engineering, Experience, …)
  components/work/      Project rows, case-study dialog, system map, archive
  setupProxy.js         Dev only: mounts api/contact.js under `npm start`
```

Content lives in `src/data/` — add or edit a project there; no component changes needed.
Case studies open in a dialog and can be linked directly: `/?case=printpalash`.

## Development

```bash
npm install
cp .env.example .env.local   # add SMTP credentials to test the contact form
npm start                    # http://localhost:3000
npm run build
```

## Contact form — environment variables

Set these in `.env.local` locally and in **Vercel → Project → Settings → Environment Variables**:

| Variable         | Required | Default                          |
| ---------------- | -------- | -------------------------------- |
| `EMAIL_USER`     | yes      | —                                |
| `EMAIL_PASSWORD` | yes      | —                                |
| `EMAIL_HOST`     | no       | `smtp.gmail.com`                 |
| `EMAIL_PORT`     | no       | `465`                            |
| `CONTACT_TO`     | no       | `bamideledavidsmart40@gmail.com` |

For Gmail, `EMAIL_PASSWORD` must be an App Password (requires 2-Step Verification), not the account password.
Never prefix these with `REACT_APP_` — that would expose them in the browser bundle.

If the variables are missing, the form shows a friendly "temporarily unavailable" message with the email address and WhatsApp instead of pretending to send.

## CV

Place the final PDF at:

```
public/David-Smart-Full-Stack-Software-Developer-CV.pdf
```

The site detects it automatically. Until it exists, the CV buttons fall back to "Request CV by email" rather than a broken download.
