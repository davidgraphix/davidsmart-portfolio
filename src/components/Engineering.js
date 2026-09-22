import React from "react";
import { architecture, capabilities, stack } from "../data/profile";
import { Reveal, SectionHeader } from "./ui";

function ArchitectureDiagram() {
  return (
    <figure aria-labelledby="arch-caption">
      <ol className="relative">
        {architecture.map((row, i) => (
          <Reveal as="li" key={row.layer} delay={i * 40} className="relative grid gap-3 pb-3 last:pb-0 md:grid-cols-12 md:gap-6">
            {/* Layer label with a connecting rail */}
            <div className="relative flex items-start gap-3 md:col-span-3">
              <span className="relative z-10 mt-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-surface font-mono text-[10px] text-muted">
                {i + 1}
              </span>
              {i < architecture.length - 1 && (
                <span className="absolute left-3 top-10 h-[calc(100%-1rem)] w-px bg-line md:h-[calc(100%+0.25rem)]" aria-hidden="true" />
              )}
              <p className="mt-4 text-sm font-semibold text-ink">{row.layer}</p>
            </div>
            <div className="card ml-9 p-4 transition-colors hover:border-ink/20 md:col-span-9 md:ml-0 md:p-5">
              <p className="font-mono text-[12.5px] text-accent">{row.tech}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{row.detail}</p>
              <p className="mt-3 text-[12px] text-faint">
                <span className="font-mono uppercase tracking-wider">Seen in</span>{" "}
                <span className="text-muted">{row.seenIn.join(" · ")}</span>
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
      <figcaption id="arch-caption" className="mt-6 max-w-prose text-sm leading-relaxed text-faint">
        An illustration of the layers I work across, not a claim that every project uses all of them. Each
        layer lists only the projects where it's visible in the code.
      </figcaption>
    </figure>
  );
}

export default function Engineering() {
  return (
    <section id="engineering" className="section" aria-labelledby="eng-title">
      <div className="container">
        <SectionHeader
          index="02"
          eyebrow="How I build"
          id="eng-title"
          title="From the interface to the database, and the parts in between."
          lead="Most of my work sits behind the screenshots: APIs, authentication, data models, payments, third-party integrations and the admin tools that businesses operate from."
        />

        <ArchitectureDiagram />

        <div className="mt-20">
          <Reveal>
            <p className="eyebrow mb-8">Capabilities, with where to find them</p>
          </Reveal>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <Reveal key={c.title} className="flex flex-col bg-surface p-6">
                <h3 className="text-base font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{c.text}</p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-faint">{c.projects}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div id="stack" className="mt-20 scroll-mt-24">
          <Reveal>
            <p className="eyebrow mb-8">Current stack</p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((group) => (
              <Reveal key={group.group} className="border-t border-ink pt-4">
                <h3 className="text-sm font-semibold text-ink">{group.group}</h3>
                <ul className="mt-3 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-[15px] text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-8 text-sm text-faint">
              Supporting skill: UI/UX design in Figma.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
