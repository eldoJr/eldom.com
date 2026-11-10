"use client"

import Image from "next/image"
import { useRef } from "react"
import { useScroll, useTransform, motion, MotionValue } from "framer-motion"
import { useInView } from "@/lib/useinview"

const WORDS = [
  "I", "love", "to", "inspire,", "because", "I", "know", "what", "it's", "like",
  "to", "be", "inspired.", "Seeing", "design", "work", "and", "having", "fun,",
  "that's", "all", "about."
]

const MUTED_FROM = 19 // "that's all about." fades

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

export default function About() {
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
      className="relative z-10 bg-black rounded-b-[1.5rem]"
      style={{ height: "250vh" }}
    >
      <section
        id="about"
        className="sticky top-0 flex items-center px-10 md:px-20 py-24 h-screen rounded-b-[1.5rem] overflow-hidden"
      >
      <div className="flex items-start gap-16">

        {/* Scroll-reveal text */}
        <p className="text-4xl md:text-6xl font-normal tracking-tight leading-[1.15] max-w-3xl">
          {WORDS.map((word, i) => {
            const step = 1 / WORDS.length
            const start = i * step
            const end = start + step * 2
            return (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                start={start}
                end={Math.min(end, 1)}
                muted={i >= MUTED_FROM}
              />
            )
          })}
        </p>

        {/* Image — scroll-driven scale + subtle rotate */}
        <motion.div
          className="shrink-0 w-64 md:w-80 overflow-hidden rounded-2xl will-change-transform"
          style={{
            opacity: inView ? 1 : 0,
            clipPath: inView ? "inset(0% 0% 0% 0% round 16px)" : "inset(100% 0% 0% 0% round 16px)",
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
              src="/images/me.png"
              alt="Photo of me"
              width={320}
              height={400}
              className="w-full h-auto object-cover grayscale"
            />
          </motion.div>
        </motion.div>

      </div>
      </section>
    </div>
  )
}
