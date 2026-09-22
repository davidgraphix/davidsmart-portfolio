import React from "react";
import { FiDownload, FiFileText, FiLinkedin, FiMail } from "react-icons/fi";
import { experience, stack } from "../data/profile";
import { links, site } from "../data/site";
import { ExternalLink, Reveal, SectionHeader } from "./ui";

const selectedCapabilities = [
  "Full-stack web applications with Next.js and ASP.NET Core",
  "REST API design, validation and versioning",
  "JWT authentication and role/permission-based authorization",
  "E-commerce: catalogue, checkout, payments and refunds",
  "Admin dashboards and internal operations tools",
  "PostgreSQL data modelling with Entity Framework Core",
];

function CvAction({ cvStatus }) {
  if (cvStatus === "available") {
    return (
      <a href={links.cv} download={site.cv.file} className="btn-primary w-full px-5 sm:w-auto">
        <FiDownload aria-hidden="true" />
        Download CV (PDF)
      </a>
    );
  }
  if (cvStatus === "checking") {
    return (
      <span className="btn-secondary w-full cursor-wait px-5 opacity-70 sm:w-auto" aria-live="polite">
        Checking CV…
      </span>
    );
  }
  // PDF not deployed yet — offer a real alternative instead of a broken link.
  return (
    <a
      href={`${links.email}?subject=${encodeURIComponent("CV request")}`}
      className="btn-primary w-full px-5 sm:w-auto"
    >
      <FiMail aria-hidden="true" />
      Request CV by email
    </a>
  );
}

export default function Resume({ cvStatus }) {
  return (
    <section id="resume" className="section" aria-labelledby="resume-title">
      <div className="container">
        <SectionHeader
          index="06"
          eyebrow="Resume"
          id="resume-title"
          title="The CV, at a glance."
          lead="A summary of the document recruiters and hiring teams can download below."
        />

        <Reveal className="card overflow-hidden shadow-card">
          {/* Document header */}
          <div className="flex flex-col gap-6 border-b border-line p-6 sm:p-8 md:flex-row md:items-end md:justify-between">
            <div className="flex items-start gap-4">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-line bg-subtle text-muted sm:flex">
                <FiFileText size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-2xl font-semibold tracking-tight text-ink">{site.name}</p>
                <p className="mt-1 text-muted">
                  {site.role} · {site.location}
                </p>
                <p className="mt-2 font-mono text-[11px] text-faint">{site.cv.file}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <CvAction cvStatus={cvStatus} />
              <ExternalLink href={links.linkedin} className="btn-secondary w-full px-4 sm:w-auto">
                <FiLinkedin aria-hidden="true" />
                LinkedIn
              </ExternalLink>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="border-b border-line p-6 sm:p-8 md:col-span-7 md:border-b-0 md:border-r">
              <h3 className="eyebrow">Summary</h3>
              <p className="mt-3 leading-relaxed text-ink/90">
                Full-stack software developer building production web applications with React, Next.js and
                TypeScript on the frontend and C#, ASP.NET Core and PostgreSQL on the backend. Currently developing
                and maintaining e-commerce platforms and admin systems under contract.
              </p>

              <h3 className="eyebrow mt-8">Experience</h3>
              <ul className="mt-3 divide-y divide-line">
                {experience.map((e) => (
                  <li key={e.company} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <span>
                      <span className="font-medium text-ink">{e.company}</span>
                      <span className="text-muted"> — {e.role}, {e.type}</span>
                    </span>
                    {e.period && <span className="shrink-0 font-mono text-[12px] text-faint">{e.period}</span>}
                  </li>
                ))}
              </ul>

              <h3 className="eyebrow mt-8">Education</h3>
              <p className="mt-3 text-ink">
                {site.education.school}
                <span className="text-muted">
                  {" "}
                  — {site.education.course}, {site.education.status.toLowerCase()}
                </span>
              </p>
            </div>

            <div className="p-6 sm:p-8 md:col-span-5">
              <h3 className="eyebrow">Core technologies</h3>
              <dl className="mt-3 space-y-3">
                {stack.map((g) => (
                  <div key={g.group}>
                    <dt className="text-sm font-medium text-ink">{g.group}</dt>
                    <dd className="text-sm leading-relaxed text-muted">{g.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>

              <h3 className="eyebrow mt-8">Selected capabilities</h3>
              <ul className="mt-3 space-y-2">
                {selectedCapabilities.map((c) => (
                  <li key={c} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-[0.65em] h-px w-2.5 shrink-0 bg-faint" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
