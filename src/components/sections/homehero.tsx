"use client";

import Image from "next/image";
import Typewriter from "@/components/ui/typewriter";
import { useSection } from "@/lib/section";
import { useEffect, useRef, useState } from "react";

const D = 1200;
const EASE_OUT = "cubic-bezier(0.16,1,0.3,1)";
const EASE_IN  = "cubic-bezier(0.4,0,1,1)";

type SectionKey = "Home" | "About" | "Work" | "Shorts" | "Contact";

const content: Record<SectionKey, { lines: string[]; sub: string; typewords?: string[] }> = {
  Home: {
    lines: ["Sup, I'm Eldo.", "I'm a"],
    sub: "Passionately creating innovative digital experiences, rooted in user needs.",
    typewords: ["Full-Stack Developer", "AIML Enthusiast", "UI/UX Tinkerer", "Open Source Nerd", "Coffee-Driven Coder"],
  },
  About: {
    lines: ["A page about me.", "Check out"],
    sub: "If I'm not working, I'm probably thinking about my next trip. Or nerding out over games, comics, and fashion.",
    typewords: ["services I provide.", "what I've built.", "my story."],
  },
  Work: {
    lines: ["Things I've built."],
    sub: "A collection of projects, experiments, and ideas turned into reality.",
  },
  Shorts: {
    lines: ["Quick shorts."],
    sub: "Bite-sized content, thoughts, and creative edits.",
  },
  Contact: {
    lines: ["Let's connect."],
    sub: "Have a project in mind or just want to say hi? I'm always open to a good conversation.",
  },
};

export default function Hero() {
  const { section } = useSection();
  const [displayed, setDisplayed] = useState<SectionKey>(section as SectionKey);
  const scopeRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!scopeRef.current) return;
    const el = scopeRef.current;

    const slideIn = () => {
      el.querySelectorAll<HTMLElement>("[data-line]").forEach((line, i) => {
        line.style.transform = "translateY(105%)";
        line.animate(
          [{ transform: "translateY(105%)" }, { transform: "translateY(0%)" }],
          { duration: D, delay: i * 100, easing: EASE_OUT, fill: "forwards" }
        );
      });
    };

    const run = async () => {
      const lines = Array.from(el.querySelectorAll<HTMLElement>("[data-line]"));

      await Promise.all(
        lines.map((line, i) =>
          line.animate(
            [{ transform: "translateY(0%)" }, { transform: "translateY(105%)" }],
            { duration: 350, delay: i * 40, easing: EASE_IN, fill: "forwards" }
          ).finished
        )
      );

      setDisplayed(section as SectionKey);
      await new Promise(r => setTimeout(r, 30));
      slideIn();
    };

    // first mount — just slide in, no slide-out needed
    if (!isMounted.current) {
      isMounted.current = true;
      slideIn();
      return;
    }

    run();
  }, [section]);

  const c = content[displayed];

  return (
    <section id="hero" className="sticky top-0 min-h-screen flex items-center overflow-hidden">
      {/* bg image */}
      <img
        src="https://cdn.21st.dev/assets/mirror/a8/a8cf38f65f7315f95eba8c803c4a80a9d78cb2ea36fbfee49828396e4a0b9737.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/30" aria-hidden />
      {/* top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-6">
        <Image src="/logo-w.svg" alt="logo" width={22} height={22} />
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-4 py-2 rounded-lg backdrop-blur-sm transition-[color,border-color] duration-300"
        >
          Resume
        </a>
      </div>

      {/* content */}
      <div ref={scopeRef} className="relative z-10 px-10 md:px-20 max-w-5xl">
        {c.lines.map((line, i) => (
          <div key={`${displayed}-${i}`} className="overflow-hidden">
            <div
              data-line
              className={`text-white/50 text-4xl md:text-6xl tracking-tight ${i === 0 ? "mb-2" : ""}`}
              style={{ transform: "translateY(105%)" }}
            >
              {i === 0 ? (
                <span dangerouslySetInnerHTML={{ __html: line.replace(/Eldo\.|me\.|built\.|shorts\.|connect\./, (m) => `<strong class="font-bold text-white">${m}</strong>`) }} />
              ) : (
                <span>{line}{c.typewords && <> <Typewriter words={c.typewords} /></>}</span>
              )}
            </div>
          </div>
        ))}

        <div className="overflow-hidden mt-4">
          <div data-line className="text-[18px] text-white/40 max-w-sm leading-relaxed" style={{ transform: "translateY(105%)" }}>
            {c.sub}
          </div>
        </div>

        {displayed === "Home" && (
          <div className="overflow-hidden mt-8">
            <div data-line className="flex items-center gap-3" style={{ transform: "translateY(105%)" }}>
              <div className="flex items-center gap-[4px]">
                <span className="w-[2px] h-4 bg-white/40 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-[2px] h-4 bg-white/60 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-[2px] h-4 bg-white rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
              <span className="text-[11px] tracking-[0.25em] uppercase text-white/60 font-medium">scroll to explore</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
