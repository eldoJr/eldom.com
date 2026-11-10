"use client"

import { motion, AnimatePresence } from "framer-motion"

export const roles = [
  "Full-Stack Developer",
  "AIML Enthusiast",
  "UI/UX Tinkerer",
  "Open Source Nerd",
  "Coffee-Driven Coder",
]

export default function ShutterText({ text }: { text: string }) {
  const characters = text.split("")
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={text}
        className="inline-flex"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {characters.map((char, i) => (
          <span key={i} className="relative inline-block overflow-hidden">
            <motion.span
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: i * 0.05 + 0.1, duration: 0.8 }}
              className="inline-block font-light text-[#d4c5b0]/80 text-lg tracking-widest"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
            <motion.span
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "100%", opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: "easeInOut" }}
              className="absolute inset-0 inline-block font-thin text-[#c8b4a0] pointer-events-none"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
            <motion.span
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "-100%", opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, delay: i * 0.05 + 0.1, ease: "easeInOut" }}
              className="absolute inset-0 inline-block font-thin text-white/30 pointer-events-none"
              style={{ clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
            <motion.span
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "100%", opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, delay: i * 0.05 + 0.2, ease: "easeInOut" }}
              className="absolute inset-0 inline-block font-thin text-[#c8b4a0] pointer-events-none"
              style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </AnimatePresence>
  )
}
