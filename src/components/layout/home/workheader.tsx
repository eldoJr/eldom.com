"use client"

import { useInView } from "@/lib/useinview"

export default function WorkHeader() {
  const { ref, inView } = useInView(0.05)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative z-10 bg-white rounded-t-[1.5rem] px-10 md:px-20 pt-24 pb-10"
    >
      <p
        className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-4 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)" }}
      >
        Selected work
      </p>
      <h2
        className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:100ms]"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)" }}
      >
        Featured.<span className="text-neutral-300"> Things I&apos;ve Built.</span>
      </h2>
    </section>
  )
}
