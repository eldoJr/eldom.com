"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GooeyText } from "@/components/ui/gooey-text-morphing"

const WORDS = ["Hello.", "I design.", "I build.", "I'm Eldo."]
const MORPH_TIME = 1
const COOLDOWN_TIME = 0.6
// Approximate total runtime of the word sequence, used to sync the progress UI
const DURATION = WORDS.length * (MORPH_TIME + COOLDOWN_TIME) + COOLDOWN_TIME

const EASE = [0.76, 0, 0.24, 1] as const

export default function Intro() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  // Lock page scroll while the intro is on screen
  useEffect(() => {
    if (!visible) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [visible])

  // Percentage counter that follows the animation timeline
  useEffect(() => {
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const p = Math.min((now - start) / (DURATION * 1000), 1)
      setProgress(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const close = () => setVisible(false)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Introduction"
          className="fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden bg-[#0a0a0a] px-6 py-6 md:px-12 md:py-10"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.9, ease: EASE },
          }}
        >
          {/* Soft warm glow behind the words */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4c5b0]/[0.06] blur-3xl"
          />

          {/* Top bar */}
          <motion.header
            className="relative flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-[#d4c5b0]/50"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="font-semibold text-[#d4c5b0]">Eldo Macuácua</span>
            <button
              type="button"
              onClick={close}
              className="cursor-pointer uppercase tracking-[0.3em] text-[#d4c5b0]/50 transition-colors hover:text-[#d4c5b0] focus-visible:text-[#d4c5b0] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d4c5b0]/60"
            >
              Skip
            </button>
          </motion.header>

          {/* Center words */}
          <div className="relative flex flex-1 items-center justify-center" aria-live="off">
            <GooeyText
              texts={WORDS}
              morphTime={MORPH_TIME}
              cooldownTime={COOLDOWN_TIME}
              className="h-24 w-full"
              textClassName="text-5xl md:text-7xl lg:text-8xl font-black text-[#d4c5b0] tracking-tight"
              onComplete={close}
            />
          </div>

          {/* Bottom bar */}
          <motion.footer
            className="relative flex flex-col gap-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-end justify-between text-[10px] uppercase tracking-[0.3em] text-[#d4c5b0]/50">
              <span>Portfolio</span>
              <span className="text-2xl font-black leading-none tracking-tight text-[#d4c5b0] tabular-nums md:text-4xl">
                {String(progress).padStart(3, "0")}
              </span>
            </div>
            <div className="h-px w-full bg-[#d4c5b0]/15">
              <motion.div
                className="h-full origin-left bg-[#d4c5b0]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: DURATION, ease: "linear" }}
              />
            </div>
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
