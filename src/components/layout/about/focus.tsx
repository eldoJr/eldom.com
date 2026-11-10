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

const MUTED_FROM = 10

function Word({ word, progress, start, end, muted }: {
  word: string
  progress: MotionValue<number>
  start: number
  end: number
  muted: boolean
}) {
  const opacity = useTransform(progress, [start, end], [0.15, 1])
  const y = useTransform(progress, [start, end], [12, 0])
  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block mr-[0.25em] will-change-[opacity,transform] ${muted ? "text-[#d4c5b0]/25" : "text-[#d4c5b0]"}`}
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
        sectionRef.current = el as HTMLElement
        ;(inViewRef as React.MutableRefObject<HTMLElement | null>).current = el as HTMLElement
      }}
      className="relative z-10 bg-black"
      style={{ height: "250vh" }}
    >
      <section className="sticky top-0 flex flex-col justify-between px-10 md:px-20 py-24 h-screen overflow-hidden">

        {/* Top: headline + image */}
        <div className="flex items-start gap-16">

          {/* Scroll-reveal headline */}
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] max-w-3xl">
            {WORDS.map((word, i) => {
              const step = 1 / WORDS.length
              const start = i * step
              const end = Math.min(start + step * 2, 1)
              return (
                <Word key={i} word={word} progress={scrollYProgress} start={start} end={end} muted={i >= MUTED_FROM} />
              )
            })}
          </h2>

          {/* Image */}
          <motion.div
            className="shrink-0 overflow-hidden rounded-sm will-change-transform"
            style={{
              width: "340px",
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
                className="w-full h-[380px] object-cover grayscale"
              />
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom: label + skills + paragraph */}
        <div
          className="grid grid-cols-12 gap-8 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transitionDelay: "300ms" }}
        >
          <div className="col-span-5 flex flex-col gap-3">
            <span className="text-xs text-[#d4c5b0]/50 tracking-widest">[ WHAT I DO BEST ]</span>
            <p className="text-[#d4c5b0]/60 text-sm leading-relaxed">
              Full-Stack Development, System Design, SaaS Platforms, Dashboards,
              Websites, Landing Pages, APIs, Databases, Prototypes, Digital Systems.
            </p>
          </div>

          <div className="col-span-4 col-start-9">
            <p className="text-[#d4c5b0]/70 text-sm leading-relaxed">
              Over the years I moved into building full-stack systems, working on SaaS platforms, dashboards, design systems, and complex digital challenges.
            </p>
          </div>
        </div>

        {/* Download Resume */}
        <div className="flex justify-center">
          <a
            href="/resume.pdf"
            download
            className="text-xs text-[#d4c5b0]/60 tracking-widest border border-[#d4c5b0]/20 px-8 py-3 hover:text-[#d4c5b0] hover:border-[#d4c5b0]/50 transition-colors duration-300"
          >
            [ DOWNLOAD RESUME ]
          </a>
        </div>

      </section>
    </div>
  )
}
