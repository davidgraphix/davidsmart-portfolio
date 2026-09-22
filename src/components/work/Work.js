import React from "react";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { featuredProjects } from "../../data/projects";
import { Chips, ExternalLink, Reveal, SectionHeader } from "../ui";
import { BrowserShot, SystemMap } from "./Media";

function ProjectLinks({ project, onOpen }) {
  const { links, caseStudy } = project;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {caseStudy && (
        <button type="button" className="btn-primary" onClick={() => onOpen(project.slug)}>
          Read case study
        </button>
      )}
      {links.live && (
        <ExternalLink href={links.live} className={caseStudy ? "btn-secondary" : "btn-primary"}>
          Live site
          <FiArrowUpRight aria-hidden="true" />
        </ExternalLink>
      )}
      {links.repo && (
        <ExternalLink href={links.repo} className="btn-ghost" aria-label={`${project.name} source code on GitHub`}>
          <FiGithub aria-hidden="true" />
          Code
        </ExternalLink>
      )}
    </div>
  );
}

function Meta({ project, number }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
      <span className="text-ink">{String(number).padStart(2, "0")}</span>
      <span>{project.type}</span>
      <span aria-hidden="true" className="text-line">
        ·
      </span>
      <span>{project.engagement}</span>
    </div>
  );
}

/** Large case-study row for the flagship projects. */
function FeaturedRow({ project, number, flip, onOpen }) {
  const media = project.images ? (
    <BrowserShot
      desktop={project.images.desktop}
      mobile={project.images.mobile}
      url={project.links.live}
      name={project.name}
    />
  ) : (
    <SystemMap system={project.system} name={project.name} />
  );

  return (
    <Reveal as="article" className="grid grid-cols-1 items-start gap-10 py-14 first:pt-0 lg:grid-cols-12 lg:gap-14 lg:py-20" aria-labelledby={`p-${project.slug}`}>
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>{media}</div>

      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <Meta project={project} number={number} />
        <h3 id={`p-${project.slug}`} className="mt-3 text-3xl font-semibold text-ink sm:text-[2.1rem]">
          {project.name}
        </h3>
        <p className="mt-4 leading-relaxed text-muted">{project.summary}</p>

        {project.system && project.images && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-md border border-line bg-surface px-2.5 py-1 text-[12px] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Storefront · API · Admin dashboard
          </p>
        )}

        <div className="mt-6">
          <p className="eyebrow">Key engineering</p>
          <ul className="mt-3 space-y-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-ink/90">
                <span className="mt-[0.6em] h-px w-3 shrink-0 bg-faint" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-muted">
          <span className="font-medium text-ink">Role — </span>
          {project.role}
        </p>

        <Chips items={project.stack} className="mt-5" />

        <div className="mt-7">
          <ProjectLinks project={project} onOpen={onOpen} />
        </div>
      </div>
    </Reveal>
  );
}

/** Compact card for the second tier of featured work. */
function FeaturedCard({ project, number }) {
  return (
    <Reveal as="article" className="card group flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lift" aria-labelledby={`p-${project.slug}`}>
      <div className="overflow-hidden border-b border-line bg-subtle">
        <img
          src={project.images.desktop}
          alt={`${project.name} — screenshot of the live site`}
          width="1280"
          height="640"
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Meta project={project} number={number} />
        <h3 id={`p-${project.slug}`} className="mt-2.5 text-xl font-semibold text-ink">
          {project.name}
        </h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-4 space-y-1.5">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-ink/80">
              <span className="mt-[0.6em] h-px w-2.5 shrink-0 bg-faint" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
        <Chips items={project.stack} className="mt-5" />
        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-sm font-medium">
          {project.links.live && (
            <ExternalLink href={project.links.live} className="inline-flex items-center gap-1 text-ink link">
              Live site <FiArrowUpRight aria-hidden="true" />
            </ExternalLink>
          )}
          {project.links.repo && (
            <ExternalLink href={project.links.repo} className="inline-flex items-center gap-1.5 text-muted hover:text-ink">
              <FiGithub aria-hidden="true" /> Code
            </ExternalLink>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function Work({ onOpenCaseStudy }) {
  const flagship = featuredProjects.filter((p) => p.caseStudy);
  const secondary = featuredProjects.filter((p) => !p.caseStudy);

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHeader
          index="01"
          eyebrow="Selected work"
          id="work-title"
          title="Live products with a customer side, an API and an admin system."
          lead="The first three are full-stack platforms, two of them under active contract. Each case study covers the architecture, the engineering decisions and my role."
        />

        <div className="divide-y divide-line">
          {flagship.map((project, i) => (
            <FeaturedRow
              key={project.slug}
              project={project}
              number={i + 1}
              flip={i % 2 === 1}
              onOpen={onOpenCaseStudy}
            />
          ))}
        </div>

        <div className="mt-6 border-t border-line pt-16">
          <p className="eyebrow mb-8">Also shipped — client work</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {secondary.map((project, i) => (
              <FeaturedCard key={project.slug} project={project} number={flagship.length + i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
