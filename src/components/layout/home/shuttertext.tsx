"use client"

import { motion } from "framer-motion"

export default function ShutterText({ text }: { text: string }) {
  const characters = text.split("")

  return (
    <span className="hero-word inline-flex">
      {characters.map((char, i) => (
        <span key={i} className="relative inline-block overflow-hidden px-[0.01em]">

          {/* Main character */}
          <motion.span
            className="inline-block"
            variants={{
              hidden: { opacity: 0, filter: "blur(12px)" },
              visible: {
                opacity: 1,
                filter: "blur(0px)",
                transition: { delay: i * 0.04 + 0.3, duration: 0.7, ease: "easeOut" },
              },
              exit: {
                opacity: 0,
                filter: "blur(12px)",
                transition: { delay: i * 0.02, duration: 0.25, ease: "easeIn" },
              },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>

          {/* Top slice — sweeps left→right */}
          <motion.span
            className="absolute inset-0 inline-block text-[#c8b4a0] pointer-events-none"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
            variants={{
              hidden:  { x: "-100%", opacity: 0 },
              visible: { x: "100%", opacity: [0, 1, 0], transition: { duration: 0.6, delay: i * 0.04, ease: "easeInOut" } },
              exit:    { x: "100%", opacity: 0, transition: { duration: 0.2 } },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>

          {/* Middle slice — sweeps right→left */}
          <motion.span
            className="absolute inset-0 inline-block text-white/50 pointer-events-none"
            style={{ clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)" }}
            variants={{
              hidden:  { x: "100%", opacity: 0 },
              visible: { x: "-100%", opacity: [0, 1, 0], transition: { duration: 0.6, delay: i * 0.04 + 0.1, ease: "easeInOut" } },
              exit:    { x: "-100%", opacity: 0, transition: { duration: 0.2 } },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>

          {/* Bottom slice — sweeps left→right */}
          <motion.span
            className="absolute inset-0 inline-block text-[#c8b4a0] pointer-events-none"
            style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)" }}
            variants={{
              hidden:  { x: "-100%", opacity: 0 },
              visible: { x: "100%", opacity: [0, 1, 0], transition: { duration: 0.6, delay: i * 0.04 + 0.2, ease: "easeInOut" } },
              exit:    { x: "100%", opacity: 0, transition: { duration: 0.2 } },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>

        </span>
      ))}
    </span>
  )
}
