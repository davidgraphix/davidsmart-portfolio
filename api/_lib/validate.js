/**
 * Contact form validation, shared by the serverless function and its tests.
 * The browser validates too, but only this copy is trusted.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { min: 3, max: 150 },
  message: { min: 20, max: 5000 },
};

const clean = (value) => (typeof value === "string" ? value.trim() : "");

// Header fields must never contain line breaks (header injection).
const singleLine = (value) => clean(value).replace(/[\r\n]+/g, " ");

function validateContact(body) {
  const input = body && typeof body === "object" ? body : {};
  const data = {
    name: singleLine(input.name),
    email: singleLine(input.email).toLowerCase(),
    subject: singleLine(input.subject),
    message: clean(input.message),
  };
  const errors = {};

  if (data.name.length < LIMITS.name.min) errors.name = "Please enter your name.";
  else if (data.name.length > LIMITS.name.max) errors.name = "Name is too long.";

  if (!data.email) errors.email = "Please enter your email address.";
  else if (data.email.length > LIMITS.email.max || !EMAIL_RE.test(data.email))
    errors.email = "Please enter a valid email address.";

  if (data.subject.length < LIMITS.subject.min) errors.subject = "Please add a short subject.";
  else if (data.subject.length > LIMITS.subject.max) errors.subject = "Subject is too long.";

  if (data.message.length < LIMITS.message.min)
    errors.message = `Please write at least ${LIMITS.message.min} characters.`;
  else if (data.message.length > LIMITS.message.max)
    errors.message = `Please keep your message under ${LIMITS.message.max} characters.`;

  return { data, errors, valid: Object.keys(errors).length === 0 };
}

module.exports = { validateContact, LIMITS };
