"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSection } from "@/lib/section";

const links = ["Home", "About", "Work", "Contact"] as const;

export default function menu() {
  const [open, setOpen] = useState(false);
  const { section, setSection } = useSection();
  const active = section;
  const router = useRouter();
  const pathname = usePathname();
  const [footerVisible, setFooterVisible] = useState(false);

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
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}

      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[450px] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform] ${footerVisible ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"}`}>
        <div className="w-full rounded-2xl bg-[#080b14]/60 backdrop-blur-3xl border border-white/[0.06] shadow-2xl shadow-black/70 overflow-hidden ring-1 ring-inset ring-white/[0.04]">

          {/* dropup links */}
          <div className={`transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "max-h-[340px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
            <div className="flex flex-col px-6 pt-6 pb-4 gap-1">
              {links.map((link, i) => (
                <Link
                  key={link}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSection(link as Parameters<typeof setSection>[0]);
                    setOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    if (pathname !== "/") router.push("/");
                  }}
                  style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
                  className={`
                    group relative w-fit overflow-hidden
                    text-[2rem] font-semibold tracking-tight leading-snug
                    transition-[opacity,transform] duration-300
                    ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                    ${active === link ? "text-white" : "text-white/40"}
                  `}
                >
                  {/* visible text — slides up on hover */}
                  <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    {link}
                  </span>
                  <span
                    aria-hidden
                    className={`
                      absolute inset-0 block translate-y-full
                      transition-transform duration-300 ease-out group-hover:translate-y-0
                      ${active === link ? "text-white" : "text-white/80"}
                    `}
                  >
                    {link}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* pill bar */}
          <div className="flex items-center h-14">

            {/* logo */}
            <div className="flex items-center justify-center px-5 text-white">
              <span className="relative flex items-center justify-center w-9 h-9">
                <span className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  {[...Array(6)].map((_, i) => (
                    <i
                      key={i}
                      className="absolute block rounded-full bg-white/20 animate-ping"
                      style={{
                        width: `${4 + i * 2}px`,
                        height: `${4 + i * 2}px`,
                        top: `${10 + Math.sin(i) * 8}px`,
                        left: `${10 + Math.cos(i) * 8}px`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: `${1.5 + i * 0.3}s`,
                        animationPlayState: open ? "running" : "paused",
                      }}
                    />
                  ))}
                </span>
                <svg viewBox="0 0 736 736" width="36" height="36" className="relative z-10">
                  <title>Suho eyes</title>
                  <defs>
                    <mask id="suho-eye-cutout" x="0" y="0" width="736" height="736" maskUnits="userSpaceOnUse">
                      <rect width="736" height="736" fill="white" />
                      <image href="/suho_yeye.svg" width="736" height="736" />
                    </mask>
                  </defs>
                  <rect width="736" height="736" fill="currentColor" mask="url(#suho-eye-cutout)" />
                </svg>
              </span>
            </div>

            {/* active label */}
            <div className="flex-1 text-center text-sm font-medium text-white/50 tracking-widest uppercase select-none">
              {active}
            </div>

            {/* hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="toggle menu"
              className="group flex flex-col gap-[5px] px-5 h-full justify-center cursor-pointer"
            >
              <span className={`block h-[1.5px] w-5 bg-white/80 rounded-full transition-transform duration-300 ease-out ${open ? "translate-x-0" : "group-hover:-translate-x-1.5"}`} />
              <span className={`block h-[1.5px] w-5 bg-white/80 rounded-full transition-transform duration-300 ease-out ${open ? "translate-x-0" : "group-hover:translate-x-1.5"}`} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
