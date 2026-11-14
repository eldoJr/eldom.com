"use client"

import { useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { usePathname } from "next/navigation"
import ShutterText from "./shuttertext"

const pageData: Record<string, {
  lines: [string, string, string]
  tag: string
  sub: string
}> = {
  "/": {
    lines:  ["WEBSITES &", "DIGITAL", "PRODUCTS"],
    tag:    "Full-Stack Developer · Mozambique",
    sub:    "I design websites and digital products that convert, simplify, and scale.",
  },
  "/about": {
    lines:  ["CREATIVE", "MIND", "AT WORK"],
    tag:    "About me",
    sub:    "Designer, developer, and builder — obsessed with craft, clarity, and things that work.",
  },
  "/work": {
    lines:  ["SELECTED", "WORK", "& CASES"],
    tag:    "Portfolio · 2022 – 2025",
    sub:    "A curated set of projects across web, product, and digital systems.",
  },
  "/contact": {
    lines:  ["LET'S", "BUILD", "TOGETHER"],
    tag:    "Open for projects",
    sub:    "Have an idea or opportunity? Let's talk and make something great.",
  },
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const { lines, tag, sub } = pageData[pathname] ?? pageData["/"]
  const [line1, line2, line3] = lines

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const topBarOpacity   = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const headlineY       = useTransform(scrollYProgress, [0, 1], [0, -60])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <>
      <section ref={ref} className="relative min-h-[140vh] w-full bg-black" />

      {/* Fixed layer: glow + image + overlays */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "140%", height: "140%", background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(212,197,176,0.5) 0%, rgba(212,197,176,0.1) 55%, transparent 80%)", filter: "blur(140px)" }} />
        </div>
        <img src="/images/avatar/avatar.png" alt="" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto object-contain object-bottom opacity-30 grayscale" style={{ height: "80vh", zIndex: 1 }} />
        <div className="absolute inset-0" style={{ zIndex: 2, background: "radial-gradient(ellipse 70% 90% at 50% 40%, transparent 30%, black 100%)" }} />
        <div className="absolute inset-0" style={{ zIndex: 2, background: "linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)" }} />
      </div>

      {/* Fixed layer: top bar */}
      <motion.div
        style={{ opacity: topBarOpacity }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 pointer-events-auto"
      >
        <img src="/logo.svg" alt="Eldo Macuacua" height={36} style={{ height: "36px", width: "auto" }} />
        <a href="mailto:eldomacuacua@gmail.com" className="group text-sm text-white/50 hover:text-white transition-colors duration-300 relative">
          eldomacuacua@gmail.com
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white/60 transition-all duration-300 group-hover:w-full" />
        </a>
      </motion.div>

      {/* Fixed layer: headline */}
      <motion.div
        style={{ opacity: headlineOpacity, y: headlineY }}
        className="fixed inset-0 z-10 flex items-center pointer-events-none"
      >
        <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div key={pathname} initial="hidden" animate="visible" exit="exit" className="origin-center">

              {pathname === "/" ? (
                <>
                  <div className="relative flex items-baseline">
                    <ShutterText text={line1} />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="max-w-[220px] text-[16px] text-white/50 leading-snug hidden md:block ml-[20%]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Hey, I&apos;m Eldo. I design websites and digital products that convert, simplify, and scale.
                    </p>
                    <div className="ml-auto">
                      <ShutterText text={line2} />
                    </div>
                  </div>
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
                  <p className="mt-4 max-w-xs text-[16px] text-white/50 leading-snug md:hidden" style={{ fontFamily: "var(--font-jakarta)" }}>
                    Hey, I&apos;m Eldo. I design websites and digital products that convert, simplify, and scale.
                  </p>
                </>
              ) : (
                <>
                  <motion.p
                    variants={{
                      hidden:  { opacity: 0, y: 8 },
                      visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.5, ease: "easeOut" } },
                      exit:    { opacity: 0, transition: { duration: 0.2 } },
                    }}
                    className="text-[11px] tracking-[0.25em] uppercase text-[#d4c5b0]/40 mb-5"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {tag}
                  </motion.p>
                  <div className="flex flex-col">
                    <ShutterText text={line1} />
                    <ShutterText text={line2} />
                    <div className="flex items-baseline gap-4">
                      <ShutterText text={line3} />
                      <motion.span
                        className="hero-arrow"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      >
                        ↓
                      </motion.span>
                    </div>
                  </div>
                  <motion.p
                    variants={{
                      hidden:  { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6, ease: "easeOut" } },
                      exit:    { opacity: 0, transition: { duration: 0.2 } },
                    }}
                    className="mt-6 max-w-sm text-[15px] text-white/40 leading-relaxed"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {sub}
                  </motion.p>
                </>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}
