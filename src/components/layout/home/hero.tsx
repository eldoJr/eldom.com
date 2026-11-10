"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Top bar: slide up + fade out
  const topBarY = useTransform(scrollYProgress, [0, 0.6], [0, -60])
  const topBarOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  // Headline: scale down + fade + slight upward drift
  const headlineScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.72])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const headlineY = useTransform(scrollYProgress, [0, 0.7], [0, -40])

  return (
    <section ref={ref} className="relative z-0 flex min-h-screen w-full flex-col justify-center overflow-hidden bg-black">

      {/* Avatar background */}
      <div className="absolute inset-0 z-0 flex justify-center items-start">
        <img
          src="/images/avatar/avatar.png"
          alt=""
          className="h-full w-auto object-cover object-top opacity-30 grayscale fixed top-0"
        />
        {/* Ambient light glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(ellipse 50% 40% at 50% 35%, rgba(212,197,176,0.18) 0%, transparent 70%)" }}
        />
        {/* Vignette: edges fade to black */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 90% at 50% 40%, transparent 30%, black 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, black 0%, transparent 15%, transparent 75%, black 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)" }} />
      </div>
      <motion.div
        style={{ y: topBarY, opacity: topBarOpacity }}
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6"
      >
        <img src="/logo.svg" alt="Eldo Macuacua" height={28} style={{ height: "28px", width: "auto" }} />
        <a
          href="mailto:eldomacuacua@gmail.com"
          className="group text-sm text-white/50 hover:text-white transition-colors duration-300 relative"
        >
          eldomacuacua@gmail.com
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white/60 transition-all duration-300 group-hover:w-full" />
        </a>
      </motion.div>

      {/* Headline block */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.9 }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12"
      >
        <motion.div
          style={{ scale: headlineScale, opacity: headlineOpacity, y: headlineY }}
          className="origin-center"
        >
          {/* Line 1: WEBSITES & */}
          <div className="relative flex items-baseline gap-4">
            <span className="hero-word">WEBSITES</span>
            <span className="hero-word">&amp;</span>
          </div>

          {/* Line 2: description left + DIGITAL right */}
          <div className="flex items-center justify-between">
            <p className="max-w-[220px] text-sm text-white/50 leading-snug hidden md:block ml-[20%]">
              Hey, I&apos;m Eldo. I design websites and digital products that convert, simplify, and scale.
            </p>
            <span className="hero-word">DIGITAL</span>
          </div>

          {/* Line 3: PRODUCTS ↓ */}
          <div className="relative flex items-baseline gap-4">
            <span className="hero-word">PRODUCTS</span>
            <span className="hero-arrow">↓</span>
          </div>

          {/* Mobile description */}
          <p className="mt-4 max-w-xs text-sm text-white/50 leading-snug md:hidden">
            Hey, I&apos;m Eldo. I design websites and digital products that convert, simplify, and scale.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
