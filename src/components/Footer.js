import React from "react";
import { links, site } from "../data/site";
import { ExternalLink } from "./ui";

const items = [
  { label: "GitHub", href: links.github, external: true },
  { label: "LinkedIn", href: links.linkedin, external: true },
  { label: "Email", href: links.email, external: false },
  { label: "WhatsApp", href: links.whatsapp, external: true },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight text-ink">{site.name}</p>
          <p className="mt-1 text-sm text-muted">{site.role}</p>
          <p className="text-sm text-muted">{site.location}</p>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {items.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <ExternalLink href={item.href} className="text-muted transition-colors hover:text-ink">
                    {item.label}
                  </ExternalLink>
                ) : (
                  <a href={item.href} className="text-muted transition-colors hover:text-ink">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <p className="font-mono text-[12px] text-faint">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
