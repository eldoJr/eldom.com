"use client"

import { motion } from "framer-motion"

export default function HeroGlow() {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-screen pointer-events-none"
      style={{ zIndex: 0 }}
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        style={{
          position: "absolute",
          top: "-5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "900px",
          background: "radial-gradient(ellipse 50% 55% at 50% 25%, rgba(212,197,176,0.65) 0%, rgba(212,197,176,0.15) 45%, transparent 65%)",
          filter: "blur(90px)",
        }}
      />
    </motion.div>
  )
}
