"use client"

import Image from "next/image"
import { useRef } from "react"
import { useScroll, useTransform, motion, MotionValue } from "framer-motion"
import { useInView } from "@/lib/useinview"

const WORDS = [
  "Today", "my", "focus", "is", "clear:", "websites", "and", "dashboards",
  "for", "companies", "that", "want", "design", "to", "work", "as", "hard",
  "as", "it", "looks", "good."
]

function Word({ word, progress, start, end }: {
  word: string
  progress: MotionValue<number>
  start: number
  end: number
}) {
  const opacity = useTransform(progress, [start, end], [0.15, 1])
  const y = useTransform(progress, [start, end], [12, 0])
  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block mr-[0.25em] will-change-[opacity,transform] text-[#d4c5b0]"
    >
      {word}
    </motion.span>
  )
}

export default function Focus() {
  const { ref: inViewRef, inView } = useInView(0.05)
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.8"],
  })

  return (
    <div
      ref={(el) => {
        sectionRef.current = el
        ;(inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = el
      }}
      className="relative z-10 bg-black md:h-[250vh]"
    >
      <section className="md:sticky md:top-0 flex flex-col justify-between px-6 md:px-20 py-16 md:py-24 md:h-screen overflow-hidden gap-12 md:gap-0">

        {/* Top: headline + image */}
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16">

          {/* Scroll-reveal headline */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            {WORDS.map((word, i) => {
              const step = 1 / WORDS.length
              const start = i * step
              const end = Math.min(start + step * 2, 1)
              return (
                <Word key={i} word={word} progress={scrollYProgress} start={start} end={end} />
              )
            })}
          </h2>

          {/* Image — hidden on mobile, visible md+ */}
          <motion.div
            className="hidden md:block shrink-0 w-[280px] lg:w-[340px] overflow-hidden rounded-sm will-change-transform"
            style={{
              opacity: inView ? 1 : 0,
              clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
              transition: "clip-path 1.1s cubic-bezier(0.16,1,0.3,1) 300ms, opacity 0.5s ease 300ms",
            }}
          >
            <motion.div
              style={{
                scale: useTransform(scrollYProgress, [0, 1], [1.08, 1]),
                rotate: useTransform(scrollYProgress, [0, 1], [2, 0]),
              }}
            >
              <Image
                src="/images/me-1.jpeg"
                alt="Eldo Macuacua"
                width={340}
                height={380}
                className="w-full h-[320px] lg:h-[380px] object-cover grayscale hover:grayscale-0 transition-[filter] duration-500"
              />
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom: skills + paragraph */}
        <div
          className="flex flex-col sm:flex-row gap-6 md:grid md:grid-cols-12 md:gap-8 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transitionDelay: "300ms" }}
        >
          <div className="sm:flex-1 md:col-span-5 flex flex-col gap-3">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#d4c5b0]/40">What I Do Best</span>
            <p className="text-[#d4c5b0]/60 text-sm leading-relaxed">
              Full-Stack Development, System Design, SaaS Platforms, Dashboards,
              Websites, Landing Pages, APIs, Databases, Prototypes, Digital Systems.
            </p>
          </div>

          <div className="sm:flex-1 md:col-span-4 md:col-start-9">
            <p className="text-[#d4c5b0]/70 text-sm leading-relaxed">
              Over the years I moved into building full-stack systems, working on SaaS platforms, dashboards, design systems, and complex digital challenges.
            </p>
          </div>
        </div>

        {/* Download Resume */}
        <div className="flex justify-center md:justify-center">
          <a
            href="/resume.pdf"
            download
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#d4c5b0]/50 border border-[#d4c5b0]/20 px-8 py-3 hover:text-[#d4c5b0] hover:border-[#d4c5b0]/50 transition-colors duration-300"
          >
            Download Resume
          </a>
        </div>

      </section>
    </div>
  )
}
