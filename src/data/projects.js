/**
 * Project content.
 *
 * ACCURACY RULE: every statement here is traceable to the project's source
 * repository, its README/docs, the live site, or details David supplied.
 * No metrics, clients, outcomes or technologies are invented. If something
 * can't be verified, leave it out rather than guessing.
 *
 * Adding a project = adding one object. Components need no changes.
 *   - `featured` projects render as full case-study rows in "Selected work".
 *   - `moreProjects` render in the "More projects" grid.
 *   - `earlierWork` is a compact text list of older builds.
 *
 * `images` are real screenshots of the live sites. Where no screenshot exists
 * (e.g. SaElizabeth) the UI renders the `system` map instead — never a mock-up.
 */

import printpalashDesktop from "../assets/projects/printpalash/desktop.webp";
import printpalashMobile from "../assets/projects/printpalash/mobile.webp";
import summyDesktop from "../assets/projects/summy/desktop.webp";
import summyMobile from "../assets/projects/summy/mobile.webp";
import riseclearDesktop from "../assets/projects/riseclear/desktop.webp";
import riseclearMobile from "../assets/projects/riseclear/mobile.webp";
import blackcircleDesktop from "../assets/projects/blackcircle/desktop.webp";
import blackcircleMobile from "../assets/projects/blackcircle/mobile.webp";
import globaleaseDesktop from "../assets/projects/globalease/desktop.webp";
import globaleaseMobile from "../assets/projects/globalease/mobile.webp";
import genzhrDesktop from "../assets/projects/genzhr/desktop.webp";
import wonderDesktop from "../assets/projects/wonder/desktop.webp";
import smarttechDesktop from "../assets/projects/smarttech/desktop.webp";
import ministryDesktop from "../assets/projects/ministry/desktop.webp";

export const featuredProjects = [
  {
    // Verified from the saelizabeth-frontend repository and the live site/API.
    // Backend source isn't in this workspace: C# / ASP.NET Core comes from David's
    // project brief; endpoints, uploads, auth and payments are read from the client code,
    // and the live API host (saelizabeth-api-k232.onrender.com) confirms Render hosting.
    slug: "saelizabeth",
    name: "SaElizabeth",
    type: "Vehicle marketplace",
    engagement: "Full-stack build",
    summary:
      "A premium vehicle marketplace: customers browse vehicle listings, reserve a vehicle with an online deposit and follow the order through to delivery, while the business runs its inventory, orders, payments and shipments from a dedicated admin dashboard.",
    role: "Full-stack development across the Next.js client, the ASP.NET Core Web API, authentication, data and deployment.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "C#",
      "ASP.NET Core Web API",
      "Paystack",
      "Render",
    ],
    highlights: [
      "Vehicle storefront and auth-gated admin dashboard served from one typed Next.js codebase",
      "ASP.NET Core Web API for vehicle listings, orders, payments, invoices and auction requests",
      "Paystack vehicle deposits initialised through the API and verified by transaction reference on the callback route",
      "Vehicle listing management with drag-and-drop multipart image upload, primary-image selection and image removal",
    ],
    links: { live: "https://saelizabeth.com/" },
    images: null,
    system: {
      client: {
        title: "Vehicle storefront",
        items: [
          "Vehicle search & filters",
          "Vehicle gallery",
          "Paystack deposits",
          "Order timeline",
          "Auction requests",
          "Email confirmation",
        ],
      },
      api: {
        title: "ASP.NET Core Web API",
        items: ["Token auth", "Vehicle listings", "Orders & payments", "Invoices", "Vehicle images"],
      },
      admin: {
        title: "Admin dashboard",
        items: [
          "Revenue charts",
          "Vehicle listings",
          "Orders",
          "Customers",
          "Payments",
          "Shipments",
          "Auction requests",
        ],
      },
    },
    caseStudy: {
      overview:
        "SaElizabeth is a vehicle marketplace with two sides: a customer-facing storefront for browsing and reserving vehicles, and an administrative system the business uses to run vehicle inventory, orders, deposits and deliveries.",
      problem:
        "Selling vehicles online involves more than a listing page. A buyer needs to reserve a specific vehicle with a deposit, receive an invoice and see where the order stands; the business needs one place to manage vehicle listings and photos, confirm payments, update orders and coordinate shipments.",
      solution:
        "A Next.js client for customers and administrators, talking to an ASP.NET Core Web API. Customers search and filter vehicles, pay a deposit through Paystack, download invoices and follow an order-status timeline — or request a vehicle that isn't listed through the auction-request form. Administrators manage the same records through a dashboard with revenue charts and screens for vehicles, orders, customers, payments, shipments and auction requests.",
      engineering: [
        {
          label: "Frontend",
          text: "Next.js App Router with TypeScript and Tailwind CSS. Server state through TanStack Query, session and filter state in Zustand, forms validated with React Hook Form and Zod, and a single Axios client that attaches the session token to every API request.",
        },
        {
          label: "Backend",
          text: "ASP.NET Core Web API in C#, hosted on Render, with endpoints for authentication, vehicles, orders, payments, invoices, customers, notifications, dashboard statistics and auction requests.",
        },
        {
          label: "Authentication",
          text: "Bearer-token authentication with refresh tokens, held in cookies on the client. Registration, login and email confirmation flows; admin routes are gated behind an authenticated session.",
        },
        {
          label: "Payments",
          text: "Paystack deposits are initialised through the API; the client callback route then asks the API to verify the transaction by its reference. Customers can download the order invoice from the API.",
        },
        {
          label: "Vehicle images",
          text: "Admins upload vehicle photos by drag and drop (React Dropzone); files are sent to the API as multipart form data, with separate endpoints to set a listing's primary image and to delete images.",
        },
        {
          label: "Admin",
          text: "Dashboard with Recharts revenue charts, vehicle listing management, order and auction-request status updates, payments, customers and shipment tracking.",
        },
      ],
      features: [
        "Vehicle search with type, price-range and sort filters",
        "Vehicle detail pages with image carousel",
        "Paystack vehicle deposits",
        "Invoice download",
        "Order tracking with status timeline",
        "Auction vehicle request form",
        "Customer profile, registration and email confirmation",
        "Admin: vehicles, orders, customers, payments, shipments, auction requests, settings",
      ],
      outcome:
        "A live vehicle marketplace at saelizabeth.com, with the customer storefront and the administrative back office running on the same API.",
    },
  },
  {
    // Production stack verified against the live site (Sept 2026): storefront served by
    // Vercel; checkout calls summy-api.onrender.com/api/v1/payments/initialize and /verify and
    // is labelled "Pay securely with Flutterwave". No Paystack code ships in production —
    // Paystack belonged to the earlier v1 storefront and is intentionally not mentioned.
    slug: "summy-solutions",
    name: "Summy Solutions",
    type: "E-commerce platform",
    engagement: "Contract · Dec 2025 – Present",
    summary:
      "Production e-commerce platform for a Nigerian home-appliance retailer. I develop and maintain it under contract: a Next.js storefront, an ASP.NET Core API built on Clean Architecture, and a full administrative back office.",
    role: "Full-stack developer under contract — storefront, API and admin dashboard. I also trained, and currently guide, a junior developer on implementation tasks.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "ASP.NET Core",
      "EF Core",
      "PostgreSQL",
      "Supabase",
      "JWT",
      "Flutterwave",
      "Cloudinary",
      "Docker",
      "xUnit",
    ],
    highlights: [
      "Clean Architecture API (Domain, Application, Infrastructure, API) on ASP.NET Core and EF Core with PostgreSQL",
      "JWT access tokens with rotating, hashed refresh tokens, reuse detection and permission-based RBAC",
      "Flutterwave payments with server-side verification, webhooks and a refund workflow",
      "Back office for products, inventory, orders, refunds, customers, roles, media, emails and audit logs",
    ],
    links: { live: "https://www.summysolutions.com/" },
    images: { desktop: summyDesktop, mobile: summyMobile },
    system: {
      client: {
        title: "Storefront",
        items: [
          "Catalogue & search",
          "Cart & checkout",
          "Payments",
          "Customer dashboard",
          "Wishlist & notifications",
          "Auth & verification",
        ],
      },
      api: {
        title: "ASP.NET Core API",
        items: [
          "Auth & RBAC",
          "Catalogue & inventory",
          "Orders & invoices",
          "Flutterwave",
          "Cloudinary media",
          "Brevo email",
        ],
      },
      admin: {
        title: "Admin back office",
        items: [
          "Analytics",
          "Products & inventory",
          "Orders & refunds",
          "Payments",
          "Customers",
          "Roles & users",
          "Media",
          "Audit logs",
        ],
      },
    },
    caseStudy: {
      overview:
        "Summy Solutions & Technology Ventures sells televisions, refrigerators, air conditioners and home appliances across Nigeria. I work on the platform under an ongoing contract, building new modules and maintaining what is already in production.",
      problem:
        "The business needs to operate its own store end to end — catalogue and stock, checkout and payment confirmation, refunds, customer communication — with staff given access only to what their role requires.",
      solution:
        "A Next.js storefront and admin back office backed by an ASP.NET Core API organised as Clean Architecture. The API is split into modules — authentication, product catalogue and inventory, media, customers, orders, payments and email — each documented and covered by tests.",
      engineering: [
        {
          label: "Frontend",
          text: "Next.js 15 and React 19 with TypeScript. Customer routes for shop, cart, checkout, payment and account; a separate admin area for analytics, catalogue, inventory, orders, refunds, payments, customers, roles, media, email logs, audit logs and trash.",
        },
        {
          label: "Backend",
          text: "ASP.NET Core with Domain, Application, Infrastructure and API projects. FluentValidation, Serilog structured logging with correlation IDs, URL-versioned endpoints (/api/v1), Swagger, a uniform response envelope and health checks.",
        },
        {
          label: "Database",
          text: "EF Core with Npgsql on PostgreSQL (Supabase). Snake-case naming, optimistic concurrency via xmin, a global soft-delete filter and GUID v7 keys.",
        },
        {
          label: "Authentication",
          text: "JWT access tokens with rotating, hashed refresh tokens and reuse detection, session and device management, login history, and permission-based authorization with roles.",
        },
        {
          label: "Integrations",
          text: "Flutterwave payment initialisation, server-side verification, webhooks and refunds; Cloudinary product media; Brevo transactional email with templates and delivery logging.",
        },
        {
          label: "Deployment & testing",
          text: "Storefront on Vercel and API on Render, as served in production. The API repository includes a multi-stage Dockerfile and docker-compose for running it with PostgreSQL. xUnit unit tests across auth, payments, orders, catalogue and email, plus integration tests with WebApplicationFactory.",
        },
      ],
      decisions: [
        "Client route guards wait for the persisted session to hydrate, and sessions sync across tabs, so server-side refresh-token reuse detection no longer logs out users who have several tabs open.",
        "Non-critical integrations don't block API startup. A missing Cloudinary configuration is surfaced through a boot-time warning and a degraded health check instead of taking the whole API down.",
        "Missing admin capabilities, such as the customer list, were built as new endpoints following the established repository → service → controller pattern rather than patched in the UI.",
      ],
      features: [
        "Product catalogue with categories, brands, variants, specifications and stock",
        "Cart, checkout and Flutterwave payments with verification",
        "Order lifecycle with timeline, invoices and receipts",
        "Refund workflow",
        "Customer profiles, addresses, wishlist, notifications and referrals",
        "Role- and permission-based staff access",
        "Audit logging",
      ],
      outcome:
        "Live in production at summysolutions.com and under continuing development and maintenance.",
    },
  },
  {
    slug: "printpalash",
    name: "PrintPalash",
    type: "E-commerce & print operations",
    engagement: "Contract · Aug 2025 – Present",
    summary:
      "Production e-commerce platform for a Lagos printing, packaging and branding company, paired with an internal system for orders, pricing, production and payments. Built under contract; I continue to manage and maintain it.",
    role: "Full-stack developer under contract — storefront, ASP.NET Core API, admin dashboard and ongoing platform maintenance.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "C#",
      "ASP.NET Core",
      "EF Core",
      "PostgreSQL",
      "JWT",
      "Cloudinary",
      "QuestPDF",
      "xUnit",
    ],
    highlights: [
      "Server-enforced authorization policies for Super Admin, Sales Rep and Production Manager roles",
      "Order status workflow that rejects invalid transitions and feeds public order tracking",
      "Invoices and production job cards generated server-side — job cards intentionally carry no pricing",
      "Audit log committed in the same unit of work as the change it records; rate-limited auth, tracking and catalogue endpoints",
    ],
    links: {
      live: "https://printpalash.com/",
      repo: "https://github.com/davidgraphix/printpalash",
    },
    images: { desktop: printpalashDesktop, mobile: printpalashMobile },
    system: {
      client: {
        title: "Storefront",
        items: [
          "Product catalogue",
          "Product pages",
          "Quote requests",
          "Order tracking",
          "Blog & SEO",
          "WhatsApp ordering",
        ],
      },
      api: {
        title: "ASP.NET Core API",
        items: [
          "JWT & role policies",
          "Orders & pricing",
          "PDF documents",
          "Uploads",
          "Audit log",
          "Tracking",
        ],
      },
      admin: {
        title: "Admin dashboard",
        items: [
          "Analytics",
          "Orders",
          "Payments",
          "Products & pricing",
          "Categories & brands",
          "Customers",
          "Staff",
          "Audit logs",
        ],
      },
    },
    caseStudy: {
      overview:
        "PrintPalash sells printing, packaging and branding products to businesses in Lagos. The public site carries a deep, category-driven catalogue; behind it, the team runs orders, pricing, production and payments through an admin dashboard.",
      problem:
        "Print work is priced by specification and moves through production stages. Staff with different responsibilities — sales, production, management — need different levels of access, and financial figures have to stay consistent between invoices, reports and exports.",
      solution:
        "A Next.js storefront and admin dashboard backed by an ASP.NET Core API on PostgreSQL. Authorization policies are enforced on every protected endpoint; order totals and documents are produced on the server from the stored order, never recalculated in the browser.",
      engineering: [
        {
          label: "Frontend",
          text: "Next.js 15 with TypeScript and Tailwind CSS. Public catalogue, product pages, quote flow, order tracking and blog; an admin area for analytics, orders, payments, products, categories, brands, customers, staff, settings and audit logs.",
        },
        {
          label: "Backend",
          text: "ASP.NET Core 9 Web API with controllers, services and repositories, FluentValidation, middleware, and built-in rate limiting policies for authentication, tracking and catalogue endpoints.",
        },
        {
          label: "Database",
          text: "EF Core with Npgsql on PostgreSQL for catalogue, orders, status history, payments, users and audit entries.",
        },
        {
          label: "Authentication",
          text: "JWT bearer authentication with BCrypt password hashing. Named authorization policies for Super Admin, Sales Rep and Production Manager — financial reporting and base-price changes are restricted to Super Admin.",
        },
        {
          label: "Documents & media",
          text: "QuestPDF invoices and job cards generated from the stored order. Uploaded artwork is validated before it's sent to Cloudinary. Order emails through Brevo.",
        },
        {
          label: "Testing",
          text: "xUnit suite covering pricing, role boundaries, order status workflow, payments and overpayment, upload validation, audit logging, financial export and concurrent order creation.",
        },
      ],
      decisions: [
        "Revenue and exports read money from the order line as it was sold. Historical orders are never re-priced from the current catalogue, so reports always agree with the invoices they came from.",
        "Cancelled and refunded are terminal states. A cancelled order can't quietly re-enter production; the team raises a new one, keeping the original intact for reporting.",
        "Public tracking returns a restricted DTO by tracking number and answers 404 on a miss without hinting whether other codes exist.",
        "Hiding a button in the admin UI isn't treated as security — every protected endpoint carries a policy.",
      ],
      features: [
        "Product catalogue across fifteen printing categories",
        "Quote requests and WhatsApp ordering",
        "Public order tracking with status history",
        "Invoices and job cards (PDF)",
        "Payments and overpayment handling",
        "Analytics and monthly accounting CSV export",
        "Staff management with role-based access",
        "Sitemap, robots.txt, canonical URLs and structured data",
      ],
      outcome:
        "Live at printpalash.com. I continue to manage the platform, ship fixes and extend the admin system.",
    },
  },
  {
    slug: "riseclear",
    name: "RiseClear",
    type: "Service business website",
    engagement: "Client project · Winnipeg, Canada",
    summary:
      "Website for RiseClear Property Services, a residential and commercial cleaning company in Winnipeg. Every route through the site leads to a quote request, delivered by a server-side email endpoint.",
    role: "Design and development, including the contact backend.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Nodemailer"],
    highlights: [
      "Next.js API route that emails each enquiry to the business and sends an automatic reply to the client",
      "Quote form with validation and loading, success and error states",
      "Metadata, Open Graph, canonical URL and JSON-LD structured data for local search",
      "WhatsApp click-to-chat with a prefilled message",
    ],
    links: {
      live: "https://www.risecleaning.ca/",
      repo: "https://github.com/davidgraphix/riseclear",
    },
    images: { desktop: riseclearDesktop, mobile: riseclearMobile },
  },
  {
    slug: "blackcircle",
    name: "BlackCircle",
    type: "Markets & finance education platform",
    engagement: "Live preview",
    summary:
      "A research and education platform focused on African capital markets — market pulse indicators, commentary, investing guides, a learning hub and corporate training programmes.",
    role: "Frontend architecture and development.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Radix UI"],
    highlights: [
      "Market pulse strip for NGX All-Share Index, treasury bills, inflation and FX",
      "Content modelled as typed data modules (courses, guides, market scoop, stories) rendered through shared layouts",
      "Learning hub with course pages, investing guides and corporate training",
      "Editorial typography that keeps dense financial content readable",
    ],
    links: {
      live: "https://blackcircle.vercel.app/",
      repo: "https://github.com/davidgraphix/blackcircle",
    },
    images: { desktop: blackcircleDesktop, mobile: blackcircleMobile },
  },
  {
    slug: "global-ease-hr",
    name: "Global Ease HR",
    type: "HR consulting & academy website",
    engagement: "Client project",
    summary:
      "A corporate site for an HR consultancy that runs an advisory practice and a training academy side by side, with an insights blog, job openings and consultation booking.",
    role: "Design and development.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "Separate service tracks for the consulting practice and the academy",
      "Insights blog with dynamic article routes",
      "Job openings and consultation booking as direct entry points",
      "Responsive service and programme grids",
    ],
    links: { live: "https://globaleasehr.com/" },
    images: { desktop: globaleaseDesktop, mobile: globaleaseMobile },
  },
];

export const moreProjects = [
  {
    // Own product. Verified from workeva-frontend / workeva-backend READMEs and docs
    // (multi-tenancy.md, authorization.md, render.yaml). No public deployment yet.
    slug: "workeva",
    name: "Workeva",
    type: "Workforce management SaaS · My product",
    status: "In development",
    summary:
      "My own multi-tenant SaaS for company operations: attendance with location checks, leave, tasks, notifications, reports and an audit trail. Each company is an isolated tenant, enforced in the API and by PostgreSQL row-level security, with role- and permission-based access.",
    stack: ["ASP.NET Core", "EF Core", "Supabase", "Next.js", "TanStack Query", "xUnit", "Playwright"],
    links: { repo: "https://github.com/davidgraphix/workeva-frontend" },
  },
  {
    slug: "genz-hr",
    name: "Gen Z HR",
    type: "Editorial & community platform",
    summary:
      "A culture-forward HR brand for young professionals, built as an editorial product: career conversations, workplace culture and community.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    links: {
      live: "https://genz-hr-bdl6.vercel.app/",
      repo: "https://github.com/davidgraphix/genz-hr",
    },
    image: genzhrDesktop,
  },
  {
    slug: "wonder-pictures",
    name: "Wonder Pictures",
    type: "Videography portfolio & booking",
    summary:
      "Cinematic portfolio for a film company — featured films, a filterable portfolio, service listings and a booking form with WhatsApp.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    links: {
      live: "https://wonderpictures-beta.vercel.app/",
      repo: "https://github.com/davidgraphix/wonderpictures",
    },
    image: wonderDesktop,
  },
  {
    slug: "smart-tech-academy",
    name: "SmartTech Academy",
    type: "Education website",
    summary:
      "Website for a tech academy teaching frontend, backend and UI/UX design — mission, courses and learning structure presented clearly.",
    stack: [],
    links: { live: "https://smart-tech-academy.vercel.app/" },
    image: smarttechDesktop,
  },
  {
    slug: "ministry-tracker",
    name: "Ministry Tracker",
    type: "Attendance management dashboard",
    summary:
      "Attendance system for Discovery Center to track worker participation across services — workers, departments, events and attendance rankings.",
    stack: [],
    links: { live: "https://dcadminapp.netlify.app/" },
    image: ministryDesktop,
  },
  {
    slug: "dsmart-web-studio",
    name: "DSmart Web Studio",
    type: "Studio site & lead generation",
    summary:
      "Marketing site for my web studio, with case-study pages and a quote endpoint that validates input, rate-limits requests and delivers email via Nodemailer.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Nodemailer"],
    links: {
      live: "https://dsmartwebstudio.vercel.app/",
      repo: "https://github.com/davidgraphix/dsmartwebstudio",
    },
  },
  {
    slug: "damzypictures",
    name: "DamzyPictures",
    type: "Photography & multimedia website",
    summary:
      "Portfolio site for a media brand offering photography, videography and live streaming, with a featured works gallery and WhatsApp booking.",
    stack: ["Next.js", "Tailwind CSS"],
    links: { live: "https://www.damzypictures.com/" },
  },
];

export const earlierWork = [
  { name: "QuickCart", note: "E-commerce storefront", live: "https://e-commerse-chi.vercel.app/" },
  { name: "CryptoPlace", note: "Crypto market prices", live: "https://cryptoplace-liard.vercel.app/" },
  { name: "Real estate site", note: "React, Vite, Tailwind CSS", live: "https://davvidsmartrealestate.netlify.app" },
  { name: "Analytics dashboard", note: "Charts & data UI", live: "https://dashboard-sable-beta-28.vercel.app/" },
];
