"use client"

import { useRef } from "react"
import { useScroll, useTransform, motion, MotionValue } from "framer-motion"

const WORDS = [
  "Stunning", "websites,", "built", "to", "perform.", "I", "craft",
  "high-performance", "digital", "experiences", "with", "depth,", "detail,",
  "and", "a", "whole", "lot", "more."
]

const MUTED_FROM = WORDS.length

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
      className={`inline-block mr-[0.3em] will-change-[opacity,transform] ${muted ? "text-[#d4c5b0]/30" : "text-[#d4c5b0]"}`}
    >
      {word}
    </motion.span>
  )
}

export default function WhatIDo() {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.8"],
  })

  return (
    <div
      ref={sectionRef}
      className="relative z-10 bg-black"
      style={{ height: "250vh" }}
    >
      <section className="sticky top-0 flex items-center px-6 md:px-16 lg:px-20 h-screen overflow-hidden">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-16 lg:gap-24">

          {/* Label */}
          <p className="shrink-0 text-xs font-semibold tracking-[0.2em] uppercase text-[#d4c5b0]/40 md:pt-2">
            What I Do
          </p>

          {/* Scroll-reveal text */}
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.15] max-w-3xl">
            {WORDS.map((word, i) => {
              const step = 1 / WORDS.length
              const start = i * step * 0.6
              const end = Math.min(start + step * 1.2, 0.75)
              return (
                <Word
                  key={i}
                  word={word}
                  progress={scrollYProgress}
                  start={start}
                  end={end}
                  muted={i >= MUTED_FROM}
                />
              )
            })}
          </p>

        </div>
      </section>
    </div>
  )
}
