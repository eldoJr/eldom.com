"use client"

import { useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { usePathname } from "next/navigation"
import ShutterText from "./shuttertext"
import HeroGlow from "./heroglow"

const pageHeadlines: Record<string, [string, string, string]> = {
  "/":        ["WEBSITES &", "DIGITAL", "PRODUCTS"],
  "/about":   ["CREATIVE", "MIND", "AT WORK"],
  "/work":    ["SELECTED", "WORK", "& CASES"],
  "/contact": ["LET'S", "BUILD", "TOGETHER"],
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const pathname = usePathname()

  const [line1, line2, line3] = pageHeadlines[pathname] ?? pageHeadlines["/"]

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const topBarY = useTransform(scrollYProgress, [0, 0.6], [0, -60])
  const topBarOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const headlineScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.72])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const headlineY = useTransform(scrollYProgress, [0, 0.7], [0, -40])

  return (
    <section ref={ref} className="relative z-0 flex min-h-screen w-full flex-col justify-center overflow-hidden bg-black">

      {/* Avatar background: glow → image → overlays */}
      <div className="absolute inset-0 z-0 flex justify-center items-start">
        <HeroGlow />
        <img
          src="/images/avatar/avatar.png"
          alt=""
          className="h-full w-auto object-cover object-top opacity-30 grayscale fixed top-0"
          style={{ zIndex: 1 }}
        />
        <div className="absolute inset-0" style={{ zIndex: 2, background: "radial-gradient(ellipse 70% 90% at 50% 40%, transparent 30%, black 100%)" }} />
        <div className="absolute inset-0" style={{ zIndex: 2, background: "linear-gradient(to bottom, black 0%, transparent 15%, transparent 75%, black 100%)" }} />
        <div className="absolute inset-0" style={{ zIndex: 2, background: "linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)" }} />
      </div>

      {/* Top bar */}
      <motion.div
        style={{ y: topBarY, opacity: topBarOpacity }}
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6"
      >
        <img src="/logo.svg" alt="Eldo Macuacua" height={36} style={{ height: "36px", width: "auto" }} />
        <a
          href="mailto:eldomacuacua@gmail.com"
          className="group text-sm text-white/50 hover:text-white transition-colors duration-300 relative"
        >
          eldomacuacua@gmail.com
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white/60 transition-all duration-300 group-hover:w-full" />
        </a>
      </motion.div>

      {/* Headline block */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          style={{ scale: headlineScale, opacity: headlineOpacity, y: headlineY }}
          className="origin-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="origin-center"
            >
          {/* Line 1 */}
          <div className="relative flex items-baseline">
            <ShutterText text={line1} />
          </div>

          {/* Line 2 */}
          <div className="flex items-center justify-between">
            {pathname === "/" && (
              <p className="max-w-[220px] text-[16px] text-white/50 leading-snug hidden md:block ml-[20%]" style={{ fontFamily: 'var(--font-jakarta)' }}>
                Hey, I&apos;m Eldo. I design websites and digital products that convert, simplify, and scale.
              </p>
            )}
            <div className="ml-auto">
              <ShutterText text={line2} />
            </div>
          </div>

          {/* Line 3 */}
          <div className="relative flex items-baseline gap-4">
            <ShutterText text={line3} />
            <motion.span
              className="hero-arrow"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </div>

          {/* Mobile description (home only) */}
          {pathname === "/" && (
            <p className="mt-4 max-w-xs text-[16px] text-white/50 leading-snug md:hidden" style={{ fontFamily: 'var(--font-jakarta)' }}>
              Hey, I&apos;m Eldo. I design websites and digital products that convert, simplify, and scale.
            </p>
          )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
