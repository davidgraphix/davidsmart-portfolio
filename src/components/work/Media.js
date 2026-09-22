import React from "react";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";

const hostOf = (url) => (url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "");

/** Real screenshot inside a minimal browser chrome, with an optional phone capture overlaid. */
export function BrowserShot({ desktop, mobile, url, name, eager = false }) {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
        <div className="flex h-8 items-center gap-3 border-b border-line bg-subtle px-3" aria-hidden="true">
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-line" />
            <span className="h-2 w-2 rounded-full bg-line" />
            <span className="h-2 w-2 rounded-full bg-line" />
          </span>
          <span className="truncate font-mono text-[11px] text-faint">{hostOf(url)}</span>
        </div>
        <img
          src={desktop}
          alt={`${name} — desktop screenshot of the live site`}
          width="1280"
          height="640"
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="aspect-[2/1] w-full object-cover object-top"
        />
      </div>
      {mobile && (
        <div className="absolute -bottom-6 right-3 hidden w-[22%] max-w-[132px] overflow-hidden rounded-[14px] border-[3px] border-ink/90 bg-ink shadow-lift sm:block md:right-5">
          <img
            src={mobile}
            alt={`${name} — mobile screenshot`}
            width="276"
            height="598"
            loading="lazy"
            decoding="async"
            className="block w-full rounded-[11px]"
          />
        </div>
      )}
    </div>
  );
}

function Column({ tone, title, items, label }) {
  const toneClass =
    tone === "api" ? "border-accent/40 bg-accent/[0.06]" : "border-line bg-surface";
  return (
    <div className={`flex-1 rounded-xl border p-4 ${toneClass}`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink">{title}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li key={item} className="rounded-md bg-subtle px-2 py-1 text-[12px] leading-4 text-muted">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex items-center justify-center text-faint" aria-hidden="true">
      <FiArrowDown className="md:hidden" />
      <FiArrowRight className="hidden md:block" />
    </div>
  );
}

/**
 * Customer app → API → admin system. Built from each project's verified module list;
 * used instead of screenshots where dashboard captures don't exist.
 */
export function SystemMap({ system, name, compact = false }) {
  if (!system) return null;
  return (
    <figure
      className={`rounded-card border border-line bg-subtle/60 ${compact ? "p-4" : "p-4 sm:p-6"}`}
      aria-label={`${name} system overview`}
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-2">
        <Column label="Customer-facing" title={system.client.title} items={system.client.items} />
        <Connector />
        <Column tone="api" label="Backend" title={system.api.title} items={system.api.items} />
        <Connector />
        <Column label="Operations" title={system.admin.title} items={system.admin.items} />
      </div>
      <figcaption className="mt-4 text-[12px] leading-relaxed text-faint">
        System overview drawn from the project's modules — one API serving both the customer
        experience and the administrative system.
      </figcaption>
    </figure>
  );
}
