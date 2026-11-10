"use client"

import Image from "next/image"
import { useRef } from "react"
import { useScroll, useTransform, motion, MotionValue } from "framer-motion"
import { useInView } from "@/lib/useinview"

const HEADLINE = ["I'm", "Eldo,", "a", "Creative", "Developer", "crafting", "digital", "experiences."]
const MUTED_FROM = 6

function Word({ word, progress, start, end, muted }: {
  word: string
  progress: MotionValue<number>
  start: number
  end: number
  muted: boolean
}) {
  const opacity = useTransform(progress, [start, end], [0.15, 1])
  const y = useTransform(progress, [start, end], [10, 0])
  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block mr-[0.25em] will-change-[opacity,transform] ${muted ? "text-[#d4c5b0]/40" : "text-[#d4c5b0]"}`}
    >
      {word}
    </motion.span>
  )
}

export default function AboutIntro() {
  const { ref: inViewRef, inView } = useInView(0.05)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "center 0.4"],
  })

  return (
    <section
      ref={(el) => {
        sectionRef.current = el
        ;(inViewRef as React.MutableRefObject<HTMLElement | null>).current = el
      }}
      id="about-intro"
      className="relative z-10 bg-black rounded-t-[1.5rem] px-10 md:px-20 pt-24 pb-20"
    >
      {/* Headline */}
      <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-20">
        {HEADLINE.map((word, i) => {
          const step = 1 / HEADLINE.length
          const start = i * step
          const end = Math.min(start + step * 2, 1)
          return (
            <Word key={i} word={word} progress={scrollYProgress} start={start} end={end} muted={i >= MUTED_FROM} />
          )
        })}
      </h2>

      {/* Bottom row: label + photo + text */}
      <div className="grid grid-cols-12 gap-8 items-start">

        {/* Left: bracket label */}
        <div
          className="col-span-5 pt-2 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transitionDelay: "100ms" }}
        >
          <span className="text-xs text-[#d4c5b0]/50 tracking-widest">[ MY START ]</span>
        </div>

        {/* Center: photo */}
        <div
          className="col-span-3 will-change-[clip-path,opacity]"
          style={{
            clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
            opacity: inView ? 1 : 0,
            transition: "clip-path 1.1s cubic-bezier(0.16,1,0.3,1) 200ms, opacity 0.4s ease 200ms",
          }}
        >
          <Image
            src="/images/me.png"
            alt="Eldo Macuacua"
            width={320}
            height={400}
            className="w-full h-auto object-cover grayscale rounded-sm"
          />
        </div>

        {/* Right: paragraph */}
        <div
          className="col-span-4 pt-2 flex flex-col gap-5 transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transitionDelay: "350ms" }}
        >
          <p className="text-[#d4c5b0] text-base leading-relaxed">
            My journey started earlier than most. Building websites and experimenting with design tools back when curiosity was the only guide. That mix of craft, code, and culture shaped how I see digital work today.
          </p>
          <p className="text-[#d4c5b0]/70 text-sm leading-relaxed">
            I&apos;m Eldo António Macuácua, from Inhambane, Mozambique, the &ldquo;Terra de Boa Gente.&rdquo; A place that taught me warmth, resilience, and the value of doing things with intention.
          </p>
        </div>

      </div>
    </section>
  )
}
