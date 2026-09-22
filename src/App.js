import React, { useCallback, useEffect, useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Engineering from "./components/Engineering";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Resume from "./components/Resume";
import CaseStudy from "./components/work/CaseStudy";
import MoreProjects from "./components/work/MoreProjects";
import Work from "./components/work/Work";
import { featuredProjects } from "./data/projects";
import { useCvAvailability } from "./hooks/useCvAvailability";

const findCaseStudy = (slug) => featuredProjects.find((p) => p.slug === slug && p.caseStudy) || null;

/** Keeps the open case study in `?case=<slug>` so it can be linked to directly. */
function useCaseStudyParam() {
  const [project, setProject] = useState(() =>
    typeof window === "undefined" ? null : findCaseStudy(new URLSearchParams(window.location.search).get("case"))
  );

  const setUrl = (slug) => {
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set("case", slug);
    else url.searchParams.delete("case");
    window.history.replaceState(null, "", url);
  };

  const open = useCallback((slug) => {
    const next = findCaseStudy(slug);
    if (!next) return;
    setUrl(slug);
    setProject(next);
  }, []);

  const close = useCallback(() => {
    setUrl(null);
    setProject(null);
  }, []);

  useEffect(() => {
    if (project) document.title = `${project.name} case study | David Smart`;
    else document.title = "David Smart | Full-Stack Software Developer";
  }, [project]);

  return { project, open, close };
}

export default function App() {
  const cvStatus = useCvAvailability();
  const caseStudy = useCaseStudyParam();

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero cvStatus={cvStatus} />
        <Work onOpenCaseStudy={caseStudy.open} />
        <Engineering />
        <Experience onOpenCaseStudy={caseStudy.open} />
        <MoreProjects />
        <About />
        <Resume cvStatus={cvStatus} />
        <Contact />
      </main>
      <Footer />
      <CaseStudy project={caseStudy.project} onClose={caseStudy.close} />
    </>
  );
}
