import React, { useEffect, useRef } from "react";
import { FiArrowUpRight, FiGithub, FiX } from "react-icons/fi";
import { Chips, ExternalLink } from "../ui";
import { BrowserShot, SystemMap } from "./Media";

function Block({ title, children }) {
  return (
    <section className="grid grid-cols-1 gap-3 border-t border-line py-8 md:grid-cols-12 md:gap-8">
      <h3 className="eyebrow md:col-span-3 md:pt-1">{title}</h3>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}

function List({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-ink/90">
          <span className="mt-[0.7em] h-px w-3 shrink-0 bg-faint" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Full case study in a native <dialog>: the browser provides focus trapping,
 * Escape-to-close and an inert background.
 */
export default function CaseStudy({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (project && !dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
      requestAnimationFrame(() => {
        dialog.scrollTop = 0;
      });
      document.body.style.overflow = "hidden";
    }
    if (!project && dialog.open) dialog.close();
    return undefined;
  }, [project]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const handleClose = () => {
      document.body.style.overflow = "";
      onClose();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  const cs = project?.caseStudy;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="case-title"
      className="m-0 h-[100dvh] max-h-none w-full max-w-none overflow-y-auto bg-canvas p-0 text-ink backdrop:bg-black/50 backdrop:backdrop-blur-sm md:m-auto md:my-6 md:h-[calc(100dvh-3rem)] md:max-w-5xl md:rounded-2xl md:border md:border-line md:shadow-lift"
      onClick={(e) => {
        // Click on the backdrop (the dialog element itself) closes it.
        if (e.target === dialogRef.current) dialogRef.current.close();
      }}
    >
      {project && cs && (
        <article>
          <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-canvas/90 px-5 py-3 backdrop-blur-md sm:px-8">
            <p className="truncate font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
              Case study <span className="text-line">/</span> {project.name}
            </p>
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-ink hover:bg-subtle"
              onClick={() => dialogRef.current.close()}
              aria-label="Close case study"
            >
              <FiX size={20} aria-hidden="true" />
            </button>
          </header>

          <div className="px-5 pb-16 pt-8 sm:px-8 md:px-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
              {project.type} · {project.engagement}
            </p>
            <h2 id="case-title" className="mt-3 text-3xl font-semibold sm:text-4xl">
              {project.name}
            </h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">{project.summary}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.links.live && (
                <ExternalLink href={project.links.live} className="btn-primary">
                  Visit live site <FiArrowUpRight aria-hidden="true" />
                </ExternalLink>
              )}
              {project.links.repo && (
                <ExternalLink href={project.links.repo} className="btn-secondary">
                  <FiGithub aria-hidden="true" /> Repository
                </ExternalLink>
              )}
            </div>

            <div className="mt-10 space-y-6">
              {project.images && (
                <BrowserShot
                  desktop={project.images.desktop}
                  mobile={project.images.mobile}
                  url={project.links.live}
                  name={project.name}
                />
              )}
              <div className={project.images ? "pt-6" : ""}>
                <SystemMap system={project.system} name={project.name} />
              </div>
            </div>

            <div className="mt-12">
              <Block title="Overview">
                <p className="leading-relaxed text-ink/90">{cs.overview}</p>
              </Block>
              <Block title="The problem">
                <p className="leading-relaxed text-ink/90">{cs.problem}</p>
              </Block>
              <Block title="The solution">
                <p className="leading-relaxed text-ink/90">{cs.solution}</p>
              </Block>
              <Block title="My role">
                <p className="leading-relaxed text-ink/90">{project.role}</p>
              </Block>
              <Block title="Engineering">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  {cs.engineering.map((e) => (
                    <div key={e.label}>
                      <dt className="text-sm font-semibold text-ink">{e.label}</dt>
                      <dd className="mt-1.5 text-[15px] leading-relaxed text-muted">{e.text}</dd>
                    </div>
                  ))}
                </dl>
              </Block>
              <Block title="Key features">
                <List items={cs.features} />
              </Block>
              {cs.decisions && (
                <Block title="Technical decisions">
                  <List items={cs.decisions} />
                </Block>
              )}
              <Block title="Stack">
                <Chips items={project.stack} />
              </Block>
              <Block title="Where it stands">
                <p className="leading-relaxed text-ink/90">{cs.outcome}</p>
              </Block>
            </div>
          </div>
        </article>
      )}
    </dialog>
  );
}
