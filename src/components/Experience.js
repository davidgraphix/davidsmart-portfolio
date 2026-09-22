import React from "react";
import { experience } from "../data/profile";
import { site } from "../data/site";
import { Reveal, SectionHeader } from "./ui";

export default function Experience({ onOpenCaseStudy }) {
  return (
    <section id="experience" className="section" aria-labelledby="exp-title">
      <div className="container">
        <SectionHeader
          index="03"
          eyebrow="Experience"
          id="exp-title"
          title="Contracts, internships and education."
          lead="On my current contracts I own features from the database to the interface, and I keep maintaining the platforms after launch."
        />

        <ol className="border-t border-line">
          {experience.map((item) => (
            <Reveal as="li" key={item.company} className="grid grid-cols-1 gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-4">
                <p className="font-mono text-[12px] text-faint">
                  {item.period ? item.period : item.type}
                </p>
                {item.current && (
                  <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                    Current
                  </p>
                )}
              </div>
              <div className="md:col-span-8">
                <h3 className="text-xl font-semibold text-ink">
                  {item.company}
                </h3>
                <p className="mt-1 text-[15px] text-muted">
                  {item.role} <span className="text-faint">— {item.type}</span>
                </p>
                {item.summary && <p className="mt-4 leading-relaxed text-ink/90">{item.summary}</p>}
                {item.points.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {item.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                        <span className="mt-[0.65em] h-px w-3 shrink-0 bg-faint" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
                {item.project && (
                  <button
                    type="button"
                    onClick={() => onOpenCaseStudy(item.project)}
                    className="mt-5 text-sm font-medium text-ink link"
                  >
                    Read the case study
                  </button>
                )}
              </div>
            </Reveal>
          ))}

          <Reveal as="li" className="grid grid-cols-1 gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <p className="font-mono text-[12px] text-faint">Education · {site.education.status}</p>
            </div>
            <div className="md:col-span-8">
              <h3 className="text-xl font-semibold text-ink">{site.education.school}</h3>
              <p className="mt-1 text-[15px] text-muted">{site.education.course}</p>
            </div>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}
