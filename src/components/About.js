import React from "react";
import portrait from "../assets/profile/david-portrait.webp";
import { site } from "../data/site";
import { Reveal, SectionHeader } from "./ui";

const facts = [
  { label: "Based in", value: site.location },
  { label: "Works as", value: site.role },
  { label: "Studying", value: `${site.education.course}, YABATECH` },
  { label: "Core stack", value: "Next.js · ASP.NET Core · PostgreSQL" },
];

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader index="05" eyebrow="About" id="about-title" title="Useful software, built properly." />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-4">
            <div className="overflow-hidden rounded-card border border-line bg-subtle">
              <img
                src={portrait}
                alt="Portrait of David Smart"
                width="800"
                height="1000"
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover grayscale"
              />
            </div>
          </Reveal>

          <Reveal delay={80} className="md:col-span-8">
            <div className="max-w-prose space-y-5 text-lg leading-relaxed text-ink/90">
              <p>
                I'm David Smart, a full-stack software developer in Lagos, Nigeria. I build web applications end to
                end: React and Next.js interfaces, C# and ASP.NET Core APIs, relational data, authentication and
                deployment.
              </p>
              <p className="text-muted">
                Most of my time goes into real products — e-commerce platforms and the admin systems behind them,
                for businesses that use them to take orders and run their operations. I pay the most attention to
                the parts users never see: how a payment is verified, who is allowed to change a price, and whether
                a report agrees with the invoice it came from.
              </p>
              <p className="text-muted">
                Alongside client work I'm studying Statistics at Yaba College of Technology, and I keep learning by
                shipping real products and maintaining them after launch.
              </p>
            </div>

            <dl className="mt-10 grid max-w-prose grid-cols-1 gap-x-8 border-t border-line sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.label} className="border-b border-line py-4">
                  <dt className="eyebrow">{f.label}</dt>
                  <dd className="mt-1.5 text-[15px] font-medium text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
