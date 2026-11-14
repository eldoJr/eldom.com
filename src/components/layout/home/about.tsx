"use client"

import Image from "next/image"
import { useRef } from "react"
import { useScroll, useTransform, motion, MotionValue } from "framer-motion"

const WORDS = [
  "I", "love", "to", "inspire,", "because", "I", "know", "what", "it's", "like",
  "to", "be", "inspired.", "Seeing", "design", "work", "and", "having", "fun,",
  "that's", "what", "it's", "all", "about."
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
      className="inline-block mr-[0.3em] text-[#d4c5b0] will-change-[opacity,transform]"
    >
      {word}
    </motion.span>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.8"],
  })

  const imageScale   = useTransform(scrollYProgress, [0, 1], [1.08, 1])
  const imageRotate  = useTransform(scrollYProgress, [0, 1], [2, 0])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const barY         = useTransform(scrollYProgress, [0, 1], ["100%", "0%"])

  return (
    <div
      ref={sectionRef}
      className="relative z-10 bg-black rounded-b-[1.5rem]"
      style={{ height: "250vh" }}
    >
      <section
        id="about"
        className="sticky top-0 flex items-center px-6 md:px-20 h-screen rounded-b-[1.5rem] overflow-hidden"
      >
        <div className="w-full flex flex-col md:flex-row items-start gap-10 md:gap-16">

          {/* Label */}
          <p className="shrink-0 text-xs font-semibold tracking-[0.2em] uppercase text-[#d4c5b0]/40 md:pt-2">
            About
          </p>

          {/* Text + image row */}
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16 w-full">

            {/* Scroll-reveal text */}
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.15] max-w-3xl order-2 md:order-1">
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
                  />
                )
              })}
            </p>

            {/* Image */}
            <motion.div
              className="shrink-0 w-56 sm:w-64 md:w-80 mx-auto md:mx-0 overflow-hidden rounded-2xl will-change-transform order-1 md:order-2 relative"
              style={{ opacity: imageOpacity }}
            >
              <motion.div style={{ scale: imageScale, rotate: imageRotate }}>
                <Image
                  src="/images/me.png"
                  alt="Photo of me"
                  width={320}
                  height={400}
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-[filter] duration-500"
                />
              </motion.div>

              {/* Scroll progress bar */}
              <div className="absolute bottom-4 right-4 w-[3px] h-16 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-[#d4c5b0] rounded-full"
                  style={{ height: "100%", y: barY }}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  )
}
