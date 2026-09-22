/** @type {import('tailwindcss').Config} */

// Colours are CSS variables (see src/index.css) so light/dark themes share one
// set of class names. `<alpha-value>` keeps opacity modifiers like bg-ink/5 working.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        canvas: token("canvas"),
        surface: token("surface"),
        subtle: token("subtle"),
        line: token("line"),
        ink: token("ink"),
        muted: token("muted"),
        faint: token("faint"),
        accent: token("accent"),
        "accent-ink": token("accent-ink"),
        success: token("success"),
        danger: token("danger"),
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["'Inter Tight'", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        eyebrow: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.08em" }],
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        card: "0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px -12px rgb(0 0 0 / 0.12)",
        lift: "0 2px 4px rgb(0 0 0 / 0.04), 0 18px 40px -16px rgb(0 0 0 / 0.22)",
      },
      maxWidth: {
        prose: "64ch",
      },
    },
  },
  plugins: [],
};
