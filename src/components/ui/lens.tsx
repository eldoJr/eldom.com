"use client"

import React, { useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface LensProps {
  children: React.ReactNode
  zoomFactor?: number
  lensSize?: number
}

export default function Lens({ children, zoomFactor = 2.0, lensSize = 150 }: LensProps) {
  const [hovering, setHovering] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      <AnimatePresence>
        {hovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{
              maskImage: `radial-gradient(circle ${lensSize / 2}px at ${pos.x}px ${pos.y}px, black 100%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${pos.x}px ${pos.y}px, black 100%, transparent 100%)`,
              zIndex: 10,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                transform: `scale(${zoomFactor})`,
                transformOrigin: `${pos.x}px ${pos.y}px`,
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
