"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Menu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [footerVisible, setFooterVisible] = useState(false);

  const active = links.find((l) => l.href === pathname)?.label ?? "Home";

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />}

      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[420px] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform] ${footerVisible ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"}`}>
        <div className="w-full rounded-2xl bg-[#0e0e0e]/90 backdrop-blur-2xl border border-[#d4c5b0]/[0.12] shadow-[0_8px_40px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(212,197,176,0.08)] overflow-hidden">

          {/* dropup links */}
          <div className={`transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
            <div className="flex flex-col px-6 pt-6 pb-4 gap-0.5 border-b border-[#d4c5b0]/[0.08] bg-[#d4c5b0]/[0.02]">
              {links.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  style={{ transitionDelay: open ? `${i * 45}ms` : "0ms" }}
                  className={`group relative w-fit overflow-hidden text-[2rem] font-semibold tracking-tight leading-snug transition-[opacity,transform] duration-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${active === link.label ? "text-[#d4c5b0]" : "text-white/25"}`}
                >
                  <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    {link.label}
                  </span>
                  <span
                    aria-hidden
                    className={`absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 ${active === link.label ? "text-[#d4c5b0]" : "text-[#d4c5b0]/70"}`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* pill bar */}
          <div className="flex items-center h-14">

            {/* logo */}
            <div className="flex items-center justify-center px-5">
              <img src="/logo-w.svg" alt="logo" width={18} height={18} style={{ filter: "brightness(0) saturate(100%) invert(83%) sepia(10%) saturate(400%) hue-rotate(10deg) brightness(95%)" }} />
            </div>

            {/* active label */}
            <div className="flex-1 text-center text-[11px] font-semibold text-[#d4c5b0]/60 tracking-[0.2em] uppercase select-none">
              {active}
            </div>

            {/* hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="toggle menu"
              className="group flex flex-col gap-[5px] px-5 h-full justify-center cursor-pointer"
            >
              <span className={`block h-[1.5px] rounded-full bg-[#d4c5b0]/80 transition-all duration-300 ease-out ${open ? "w-5 rotate-45 translate-y-[3.5px]" : "w-5 group-hover:w-3"}`} />
              <span className={`block h-[1.5px] rounded-full bg-[#d4c5b0]/80 transition-all duration-300 ease-out ${open ? "w-5 -rotate-45 -translate-y-[3.5px]" : "w-5 group-hover:w-4"}`} />
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
