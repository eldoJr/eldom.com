"use client"

import Image from "next/image"
import Link from "next/link"

const YEAR = new Date().getFullYear()

const nav = [
  { label: "Home",    href: "/" },
  { label: "Work",    href: "/work" },
  { label: "About",   href: "/about" },
  { label: "Contact", href: "/contact" },
]

const socials = [
  { label: "LinkedIn",  href: "https://linkedin.com/in/eldomacuacua" },
  { label: "Instagram", href: "https://instagram.com/eldomacuacua" },
  { label: "Email",     href: "mailto:eldomacuacua@gmail.com" },
]

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#0a0a0a] border-t border-[#d4c5b0]/10 px-10 md:px-20 py-16">
      <div className="flex items-start justify-between gap-12">

        {/* logo + copy */}
        <div className="flex flex-col gap-6">
          <Image src="/logo-w.svg" alt="Eldo Macuácua" width={32} height={32} />
          <p className="text-xs text-[#d4c5b0]/30 leading-relaxed">
            © {YEAR} Eldo Macuácua.<br />All rights reserved.
          </p>
        </div>

        {/* nav */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] tracking-widest uppercase text-[#d4c5b0]/30 mb-1">Menu</span>
          {nav.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm text-[#d4c5b0]/50 hover:text-[#d4c5b0] transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* socials + back to top */}
        <div className="flex flex-col items-end gap-3">
          <span className="text-[10px] tracking-widest uppercase text-[#d4c5b0]/30 mb-1">Connect</span>
          {socials.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#d4c5b0]/50 hover:text-[#d4c5b0] transition-colors duration-300"
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-6 flex items-center justify-center w-10 h-10 rounded-full border border-[#d4c5b0]/20 text-[#d4c5b0]/50 hover:border-[#d4c5b0]/60 hover:text-[#d4c5b0] transition-all duration-300"
            aria-label="Back to top"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>

      </div>
    </footer>
  )
}
