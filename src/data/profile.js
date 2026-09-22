/**
 * Experience, stack and capability content.
 * Dates and titles come only from details David supplied. Where a date isn't
 * known it is left as `null` and the UI omits it — fill it in when confirmed.
 */

export const experience = [
  {
    company: "Summy Solutions & Technology Ventures",
    role: "Full-Stack Software Developer",
    type: "Contract",
    period: "Dec 2025 – Present",
    current: true,
    summary:
      "Developing and maintaining a production e-commerce platform for a home-appliance retailer.",
    points: [
      "Build features across the Next.js storefront, ASP.NET Core API and admin back office",
      "Work across authentication, payments, catalogue, orders and media modules",
      "Trained, and currently guide, a junior developer on implementation tasks",
    ],
    project: "summy-solutions",
  },
  {
    company: "PrintPalash",
    role: "Full-Stack Software Developer",
    type: "Contract",
    period: "Aug 2025 – Present",
    current: true,
    summary:
      "Built and continue to manage a production e-commerce and print-operations platform.",
    points: [
      "Built the Next.js storefront and admin dashboard, backed by an ASP.NET Core API on PostgreSQL",
      "Implemented role-based access, order workflow, PDF documents and audit logging",
      "Maintain the live platform and ship ongoing improvements",
    ],
    project: "printpalash",
  },
  {
    company: "Fincore",
    role: "Full-Stack Engineer",
    type: "Internship",
    period: null, // TODO: add dates when confirmed
    current: false,
    summary: null,
    points: [],
  },
  {
    company: "Go Vote",
    role: "Software Developer",
    type: "Internship",
    period: null, // TODO: add dates when confirmed
    current: false,
    summary: null,
    points: [],
  },
];

export const stack = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    group: "Backend",
    items: [
      "C#",
      "ASP.NET Core",
      "ASP.NET Core Web API",
      "Entity Framework Core",
      "REST APIs",
      "JWT authentication & authorization",
    ],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "SQL Server", "Supabase"],
  },
  {
    group: "Infrastructure & tools",
    items: ["Git", "GitHub", "Docker", "Vercel", "Render", "Postman"],
  },
];

/**
 * Layers of the architecture diagram. `seenIn` names only projects whose
 * repositories show that layer — the diagram illustrates capability, it does
 * not claim every project uses every layer.
 */
export const architecture = [
  {
    layer: "Interface",
    tech: "React · Next.js · TypeScript · Tailwind CSS",
    detail: "Customer storefronts and admin dashboards, typed end to end, with validated forms and cached server state.",
    seenIn: ["SaElizabeth", "Summy", "PrintPalash"],
  },
  {
    layer: "API",
    tech: "REST · ASP.NET Core Web API · C#",
    detail: "Versioned controllers, request validation, a consistent response shape, rate limiting and health checks.",
    seenIn: ["Summy", "PrintPalash", "SaElizabeth"],
  },
  {
    layer: "Auth",
    tech: "JWT · refresh tokens · role & permission policies",
    detail: "Access tokens with rotating refresh tokens, and authorization enforced on the server — never just by hiding buttons.",
    seenIn: ["Summy", "PrintPalash"],
  },
  {
    layer: "Domain & services",
    tech: "Clean Architecture · services · workflows",
    detail: "Business rules such as order-status transitions, pricing and refunds live in services, not controllers or the UI.",
    seenIn: ["Summy", "PrintPalash"],
  },
  {
    layer: "Data",
    tech: "Entity Framework Core · PostgreSQL · SQL Server · Supabase",
    detail: "Relational models, migrations, concurrency control, soft deletes and audit trails.",
    seenIn: ["Summy", "PrintPalash", "Workeva"],
  },
  {
    layer: "Delivery",
    tech: "Docker · Vercel · Render · GitHub",
    detail: "Containerised APIs, frontends on Vercel, environment-based configuration and secrets kept out of source.",
    seenIn: ["Summy", "PrintPalash"],
  },
];

export const capabilities = [
  {
    title: "Authentication & authorization",
    text: "JWT access tokens with rotating, reuse-detected refresh tokens and role- or permission-based policies enforced on every protected endpoint (Summy, PrintPalash); bearer-token auth with refresh tokens and email confirmation (SaElizabeth).",
    projects: "Summy · PrintPalash · SaElizabeth",
  },
  {
    title: "Payments",
    text: "Summy: Flutterwave initialisation, server-side verification, webhooks and refunds. SaElizabeth: Paystack vehicle deposits, verified through the API by transaction reference.",
    projects: "Summy · SaElizabeth",
  },
  {
    title: "Admin systems",
    text: "Back offices for catalogue, inventory, orders, payments, customers, staff roles and audit logs — the side of the product the business runs on.",
    projects: "Summy · PrintPalash · SaElizabeth",
  },
  {
    title: "Media & documents",
    text: "Validated uploads to Cloudinary (Summy, PrintPalash), drag-and-drop vehicle photo uploads with primary-image selection (SaElizabeth), and server-generated PDF invoices and job cards (PrintPalash).",
    projects: "Summy · PrintPalash · SaElizabeth",
  },
  {
    title: "Data integrity",
    text: "Order-status workflows that reject invalid transitions, audit entries committed with the change they record, and reports that never re-price history.",
    projects: "PrintPalash · Summy",
  },
  {
    title: "Testing & operations",
    text: "xUnit unit and integration tests, structured logging, health checks, rate limiting and Docker-based deployment.",
    projects: "Summy · PrintPalash",
  },
];
