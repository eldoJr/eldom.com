"use client"

import { useInView } from "@/lib/useinview"

export default function WhatIDo() {
  const { ref, inView } = useInView(0.15)

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative z-10 bg-black px-10 md:px-20 py-24">
      <div className="flex items-start gap-16 md:gap-24">

        {/* Left: label */}
        <p
          className="shrink-0 text-xs font-semibold tracking-[0.2em] uppercase text-[#d4c5b0]/40 pt-2 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(12px)" }}
        >
          What I Do
        </p>

        {/* Right: content */}
        <p
          className="text-4xl md:text-6xl font-normal tracking-tight text-[#d4c5b0] leading-[1.1] transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-32px)" }}
        >
          Stunning websites,<span className="text-[#d4c5b0]/40"> built to perform. I craft high-performance digital experiences with depth, detail, and </span>more to discover beneath the surface.
        </p>

      </div>
    </section>
  )
}
