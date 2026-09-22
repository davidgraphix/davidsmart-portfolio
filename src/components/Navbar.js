import React, { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { navItems, site } from "../data/site";

function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const sectionIds = [...navItems.map((n) => n.id), "contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape, move focus in and back out.
  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector("a")?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const linkClass = (id) =>
    `rounded-md px-3 py-2 text-sm transition-colors ${
      active === id ? "text-ink" : "text-muted hover:text-ink"
    }`;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-line bg-canvas/90 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/75"
          : "border-transparent bg-canvas"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:text-canvas"
      >
        Skip to content
      </a>
      <nav className="container flex h-16 items-center justify-between gap-6" aria-label="Primary">
        <a href="#top" className="group flex items-baseline gap-2 rounded-md" onClick={() => setOpen(false)}>
          <span className="font-display text-[15px] font-semibold tracking-tight text-ink">{site.name}</span>
          <span className="hidden text-sm text-faint lg:inline">{site.role}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={linkClass(item.id)}
                  aria-current={active === item.id ? "true" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn-primary ml-3 min-h-[36px] px-3.5">
            Let's work together
          </a>
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink hover:bg-subtle md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FiX size={20} aria-hidden="true" /> : <FiMenu size={20} aria-hidden="true" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-canvas md:hidden"
      >
        <div className="container flex h-full flex-col py-6">
          <ul className="flex flex-col">
            {[...navItems, { id: "contact", label: "Contact" }].map((item) => (
              <li key={item.id} className="border-b border-line">
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-display text-2xl font-medium tracking-tight text-ink"
                >
                  {item.label}
                  {active === item.id && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
              Let's work together
            </a>
            <p className="mt-4 text-center text-sm text-faint">
              {site.role} · {site.location}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
