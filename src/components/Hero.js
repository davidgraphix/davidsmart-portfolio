import React from "react";
import { FiArrowDown, FiDownload } from "react-icons/fi";
import { links, site } from "../data/site";
import { Reveal } from "./ui";

const current = [
  { name: "Summy Solutions", detail: "E-commerce platform · Contract", since: "Dec 2025" },
  { name: "PrintPalash", detail: "E-commerce & print operations · Contract", since: "Aug 2025" },
];

const signals = [
  { label: "Focus", value: "Production web applications" },
  { label: "Frontend", value: "React · Next.js · TypeScript" },
  { label: "Backend", value: "C# · ASP.NET Core · EF Core" },
  { label: "Data & delivery", value: "PostgreSQL · Docker · Vercel · Render" },
];

export default function Hero({ cvStatus }) {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative">
      <div className="container pb-16 pt-14 md:pb-24 md:pt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow">
              <span className="text-ink">{site.name}</span>
              <span className="mx-2 text-line">/</span>
              {site.role}
              <span className="mx-2 text-line">/</span>
              {site.location}
            </p>

            <h1
              id="hero-title"
              className="mt-6 max-w-[18ch] text-[2.5rem] font-semibold leading-[1.04] text-ink sm:text-5xl md:text-6xl lg:text-[4.25rem]"
            >
              I build and ship production web applications.
            </h1>

            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted">
              Frontend, backend, database, authentication and deployment. I work in React, Next.js and
              TypeScript on the interface, and C#, ASP.NET Core and PostgreSQL behind it — building
              e-commerce platforms, admin dashboards and business applications for live clients.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#work" className="btn-primary px-5">
                View selected work
                <FiArrowDown aria-hidden="true" />
              </a>
              {cvStatus === "available" ? (
                <a href={links.cv} download className="btn-secondary px-5">
                  <FiDownload aria-hidden="true" />
                  Download CV
                </a>
              ) : (
                <a href="#contact" className="btn-secondary px-5">
                  Let's talk
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-4 lg:pt-3">
            <div className="card p-5 shadow-card">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Currently</p>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                  Active contracts
                </span>
              </div>
              <ul className="mt-4 divide-y divide-line">
                {current.map((item) => (
                  <li key={item.name} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-medium text-ink">{item.name}</p>
                      <p className="shrink-0 font-mono text-[11px] text-faint">since {item.since}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-muted">{item.detail}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-5 border-t border-line pt-4">
                <p className="text-sm leading-relaxed text-muted">
                  Studying Statistics at YABATECH alongside client work.
                </p>
                <a href="#experience" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-ink link">
                  Experience
                  <FiArrowDown aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Credibility strip — factual signals only, no invented numbers. */}
      <div className="border-t border-line bg-surface/60">
        <dl className="container grid grid-cols-2 lg:grid-cols-4">
          {signals.map((s, i) => (
            <div
              key={s.label}
              className={`py-6 pr-4 ${i % 2 === 1 ? "pl-4 lg:pl-6" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""} ${
                i > 0 ? "lg:border-l lg:border-line lg:pl-6" : ""
              } ${i % 2 === 1 ? "border-l border-line" : ""}`}
            >
              <dt className="eyebrow">{s.label}</dt>
              <dd className="mt-2 text-[15px] font-medium leading-snug text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
