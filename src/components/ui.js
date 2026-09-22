import React, { useEffect, useRef, useState } from "react";

/** Fades content in once when it enters the viewport. Respects reduced motion via CSS. */
export function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Consistent section heading: mono index + eyebrow, title, optional lead. */
export function SectionHeader({ index, eyebrow, title, lead, id, children }) {
  return (
    <Reveal className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-4">
        <p className="eyebrow">
          {index && <span className="text-ink">{index}</span>}
          {index && <span className="mx-2 text-line">/</span>}
          {eyebrow}
        </p>
      </div>
      <div className="md:col-span-8">
        <h2 id={id} className="text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl">
          {title}
        </h2>
        {lead && <p className="mt-4 max-w-prose text-base leading-relaxed text-muted sm:text-lg">{lead}</p>}
        {children}
      </div>
    </Reveal>
  );
}

/** External link that always opens safely in a new tab and says so to screen readers. */
export function ExternalLink({ href, children, className = "", ...rest }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function Chips({ items, className = "" }) {
  if (!items || items.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Technologies">
      {items.map((item) => (
        <li key={item} className="chip">
          {item}
        </li>
      ))}
    </ul>
  );
}
