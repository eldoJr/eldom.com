"use client"

import { motion } from "framer-motion"

export default function HeroGlow() {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "140%",
          height: "140%",
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(212,197,176,0.5) 0%, rgba(212,197,176,0.1) 55%, transparent 80%)",
          filter: "blur(140px)",
        }}
      />
    </motion.div>
  )
}
