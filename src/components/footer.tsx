"use client"

import Image from "next/image";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative z-10 bg-white px-10 md:px-20 py-16">
      <div className="flex items-start justify-between gap-12">

        {/* left — logo + credits */}
        <div className="flex flex-col gap-6">
          <Image src="/logo-w.svg" alt="Logo" width={36} height={46} className="opacity-90 invert" />
          <p className="text-xs text-neutral-400 leading-relaxed">
            © {YEAR} Eldom. All rights reserved.
          </p>
        </div>

        {/* center — menu */}
        <div className="flex flex-col gap-3">
          <span className="text-xs tracking-widest uppercase text-neutral-400 mb-1">Menu</span>
          {["Home", "Work", "About", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              {item}
            </a>
          ))}
        </div>

        {/* right — socials + back to top */}
        <div className="flex flex-col items-end gap-3">
          {[
            { label: "LinkedIn", href: "https://linkedin.com" },
            { label: "Instagram", href: "https://instagram.com" },
            { label: "Email", href: "mailto:hello@eldom.com" },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              {label}
            </a>
          ))}

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-6 flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 text-white hover:bg-black transition-colors"
            aria-label="Back to top"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
          </button>
        </div>

      </div>
    </footer>
  );
}
