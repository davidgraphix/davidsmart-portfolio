import React from "react";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { earlierWork, moreProjects } from "../../data/projects";
import { links } from "../../data/site";
import { Chips, ExternalLink, Reveal, SectionHeader } from "../ui";

function ProjectCard({ project }) {
  return (
    <Reveal as="article" className="card group flex flex-col overflow-hidden" aria-labelledby={`m-${project.slug}`}>
      {project.image ? (
        <div className="overflow-hidden border-b border-line bg-subtle">
          <img
            src={project.image}
            alt={`${project.name} — screenshot`}
            width="1280"
            height="640"
            loading="lazy"
            decoding="async"
            className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        // No screenshot available: a typographic header rather than a fabricated image.
        <div className="flex aspect-[16/9] items-end border-b border-line bg-subtle p-5">
          <p className="font-display text-2xl font-semibold tracking-tight text-ink/80">{project.name}</p>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-faint">{project.type}</p>
          {project.status && (
            <span className="shrink-0 rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
              {project.status}
            </span>
          )}
        </div>
        <h3 id={`m-${project.slug}`} className="mt-2 text-lg font-semibold text-ink">
          {project.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
        <Chips items={project.stack} className="mt-4" />
        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5 text-sm font-medium">
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

export default function MoreProjects() {
  return (
    <section id="projects" className="section" aria-labelledby="more-title">
      <div className="container">
        <SectionHeader
          index="04"
          eyebrow="More projects"
          id="more-title"
          title="Breadth beyond the flagship work."
          lead="Platforms in development, client websites and my own studio — each built and deployed end to end."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <Reveal className="mt-14 grid gap-6 border-t border-line pt-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">Earlier builds</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">Smaller projects from earlier in my practice.</p>
          </div>
          <ul className="divide-y divide-line border-y border-line md:col-span-8">
            {earlierWork.map((item) => (
              <li key={item.name}>
                <ExternalLink
                  href={item.live}
                  className="group flex items-center justify-between gap-4 py-3.5 text-[15px]"
                >
                  <span className="font-medium text-ink">{item.name}</span>
                  <span className="flex items-center gap-3 text-sm text-faint">
                    <span className="hidden sm:inline">{item.note}</span>
                    <FiArrowUpRight
                      aria-hidden="true"
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    />
                  </span>
                </ExternalLink>
              </li>
            ))}
          </ul>
          <div className="md:col-span-8 md:col-start-5">
            <ExternalLink href={links.github} className="inline-flex items-center gap-2 text-sm font-medium text-ink link">
              <FiGithub aria-hidden="true" />
              Browse everything on GitHub
            </ExternalLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
