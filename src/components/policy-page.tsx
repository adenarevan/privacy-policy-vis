"use client";

import { useEffect, useState } from "react";
import { privacyPolicy as policy } from "@/content/privacy-policy";

// Preserve the source's emphasis without injecting HTML into the page.
function InlineText({ text }: { text: string }) {
  return <>{text.split(/(<strong>[\s\S]*?<\/strong>)/g).map((part, index) =>
    part.startsWith("<strong>")
      ? <strong key={index}>{part.slice(8, -9)}</strong>
      : part
  )}</>;
}

function Icon({ name, className = "" }: { name: "shield" | "arrow" | "print" | "clock" | "document" | "download"; className?: string }) {
  const paths = {
    shield: <><path d="m12 3 8 3v6c0 5-4 8-8 10-4-2-8-5-8-10V6z" /><path d="m8 12 3 3 5-6" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    print: <><path d="M7 8V3h10v5M7 17H4V9h16v8h-3" /><path d="M7 14h10v7H7zM16 11h1" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    document: <><path d="M14 3H5v18h14V8zM14 3v5h5M8 12h8M8 16h6" /></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" /></>,
  };
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export function PolicyPage() {
  const [activeSection, setActiveSection] = useState(policy.sections[0].id);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveSection(visible[0].target.id);
    }, { rootMargin: "-110px 0px -55% 0px", threshold: 0 });
    policy.sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a href="#policy-content" className="skip-link">Skip to policy</a>
      <header className="site-header">
        <div className="header-inner">
          <a href="/" className="brand" aria-label={`${policy.brand} home`}><span className="brand-mark"><Icon name="shield" /></span>{policy.shortBrand}<span className="brand-divider" /><span className="brand-caption">Privacy Center</span></a>
          <a className="header-link" href="#contact-us">Contact us <Icon name="arrow" /></a>
        </div>
      </header>

      <main>
        <div className="hero-wrap">
          <div className="hero">
            <div className="hero-copy">
              <span className="eyebrow"><span className="tiny-dot" /> TRANSPARENCY & PRIVACY</span>
              <h1>Privacy Policy<span className="heading-dot">.</span></h1>
              <p className="hero-description">{policy.brand}</p>
              <div className="hero-meta"><span><Icon name="clock" /> Last updated: {policy.updatedAt}</span><span className="meta-separator" /><span>English</span></div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
              <span className="art-spark spark-one">+</span><span className="art-spark spark-two">+</span>
              <div className="shield-tile"><Icon name="shield" /></div>
              <div className="art-tag"><span className="tiny-dot" /> YOUR PRIVACY MATTERS</div>
            </div>
          </div>
        </div>

        <div className="document-layout">
          <aside className="sidebar" aria-label="Policy navigation">
            <div className="sidebar-sticky">
              <div className="sidebar-heading"><Icon name="document" /> ON THIS PAGE</div>
              <nav aria-label="Table of contents"><ol>{policy.sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`} onClick={() => setActiveSection(section.id)} aria-current={activeSection === section.id ? "location" : undefined}><span className="nav-number">{String(index + 1).padStart(2, "0")}</span>{section.title}</a></li>)}</ol></nav>
              <div className="sidebar-note"><Icon name="shield" /><p>Privacy starts with<br /><strong>clear information.</strong></p></div>
            </div>
          </aside>

          <article id="policy-content" className="policy-content">
            <div className="document-toolbar">
              <span className="document-label"><span className="tiny-dot" /> PRIVACY POLICY</span>
              <div className="document-actions">
                <a className="download-button" href="/vis-privacy-policy.pdf" download="VIS Privacy Policy.pdf"><Icon name="download" /> Download PDF</a>
                <button className="print-button" onClick={() => window.print()}><Icon name="print" /> Print / save PDF</button>
              </div>
            </div>
            <div className="last-updated">{policy.updatedStatement}</div>
            <div className="intro">{policy.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            {policy.sections.map((section, index) => (
              <section className="policy-section" id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
                <div className="section-heading"><span className="section-number">{String(index + 1).padStart(2, "0")}</span><div><h2 id={`${section.id}-title`}>{section.title}</h2></div></div>
                <div className="section-body">{section.blocks.map((block, blockIndex) => {
                  if (block.type === "list") return <ul key={blockIndex}>{block.items.map((item, itemIndex) => <li key={itemIndex}><InlineText text={item} /></li>)}</ul>;
                  if (block.type === "h3") return <h3 key={blockIndex}><InlineText text={block.text} /></h3>;
                  if (block.type === "h4") return <h4 key={blockIndex}><InlineText text={block.text} /></h4>;
                  return <p key={blockIndex}><InlineText text={block.text} /></p>;
                })}</div>
              </section>
            ))}
            <div className="end-note"><Icon name="shield" /><p>{policy.brand} · Privacy Policy</p><a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Back to top ↑</a></div>
          </article>
        </div>
      </main>

      <footer className="site-footer"><div><a href="/" className="footer-brand" aria-label={policy.brand}><Icon name="shield" />{policy.shortBrand}</a><span>{policy.brand}</span><a href="/privacy-policy">Privacy Policy</a></div></footer>
    </>
  );
}
