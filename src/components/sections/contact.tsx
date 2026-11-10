"use client"

import type React from "react"
import { useState } from "react"
import { ArrowUpRight, Calendar } from "lucide-react"
import { useInView } from "@/lib/useinview"

export default function Contact() {
  const { ref, inView } = useInView(0.1)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsClicked(true)
    setTimeout(() => setShowSuccess(true), 500)
  }

  const handleBookCall = () => {
    window.open("https://cal.com/eldo", "_blank")
  }

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="contact"
      className="relative z-10 bg-black flex min-h-screen items-center justify-center px-6"
    >
      <div
        className="relative flex flex-col items-center gap-12 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)" }}
      >
        {/* Success state */}
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: showSuccess ? 1 : 0,
            transform: showSuccess ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
            pointerEvents: showSuccess ? "auto" : "none",
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-[#d4c5b0]/40" style={{ opacity: showSuccess ? 1 : 0, transitionDelay: "100ms" }}>
              Perfect
            </span>
            <h3 className="text-3xl font-light tracking-tight text-[#d4c5b0] sm:text-4xl" style={{ opacity: showSuccess ? 1 : 0, transitionDelay: "200ms" }}>
              Let&apos;s talk
            </h3>
          </div>

          <button
            onClick={handleBookCall}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="group relative flex items-center gap-4 transition-all duration-500 cursor-pointer"
            style={{
              opacity: showSuccess ? 1 : 0,
              transform: showSuccess ? (isButtonHovered ? "scale(1.02)" : "scale(1)") : "translateY(15px)",
              transitionDelay: "150ms",
            }}
          >
            <div className="h-px w-12 bg-white/20 transition-all duration-500" style={{ transform: isButtonHovered ? "scaleX(0)" : "scaleX(1)", opacity: isButtonHovered ? 0 : 1 }} />
            <div
              className="relative flex items-center gap-3 overflow-hidden rounded-full border px-8 py-4 transition-all duration-500"
              style={{
                borderColor: isButtonHovered ? "#d4c5b0" : "rgba(212,197,176,0.15)",
                backgroundColor: isButtonHovered ? "#d4c5b0" : "transparent",
              }}
            >
              <Calendar className="size-5 transition-colors duration-500" strokeWidth={1.5} style={{ color: isButtonHovered ? "black" : "#d4c5b0" }} />
              <span className="text-sm font-medium tracking-wide transition-colors duration-500" style={{ color: isButtonHovered ? "black" : "#d4c5b0" }}>
                Book a call
              </span>
              <ArrowUpRight
                className="size-5 transition-all duration-500"
                strokeWidth={1.5}
                style={{
                  color: isButtonHovered ? "black" : "#d4c5b0",
                  transform: isButtonHovered ? "translate(3px, -3px)" : "translate(0,0)",
                }}
              />
            </div>
            <div className="h-px w-12 bg-white/20 transition-all duration-500" style={{ transform: isButtonHovered ? "scaleX(0)" : "scaleX(1)", opacity: isButtonHovered ? 0 : 1 }} />
          </button>

          <span className="text-xs tracking-widest uppercase text-[#d4c5b0]/30" style={{ opacity: showSuccess ? 1 : 0, transitionDelay: "450ms" }}>
            15 min intro call
          </span>
        </div>

        {/* Available badge */}
        <div
          className="flex items-center gap-3 transition-all duration-500"
          style={{ opacity: isClicked ? 0 : 1, transform: isClicked ? "translateY(-20px)" : "none", pointerEvents: isClicked ? "none" : "auto" }}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm font-medium tracking-widest uppercase text-[#d4c5b0]/40">Available for projects</span>
        </div>

        {/* Main CTA */}
        <div
          className="group relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          style={{ pointerEvents: isClicked ? "none" : "auto" }}
        >
          <div className="flex flex-col items-center gap-6">
            <h2
              className="relative text-center text-5xl font-light tracking-tight text-[#d4c5b0] sm:text-6xl md:text-7xl lg:text-8xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ opacity: isClicked ? 0 : 1, transform: isClicked ? "translateY(-40px) scale(0.95)" : "none" }}
            >
              <span className="block overflow-hidden">
                <span className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: isHovered && !isClicked ? "translateY(-8%)" : "none" }}>
                  Let&apos;s work
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75" style={{ transform: isHovered && !isClicked ? "translateY(-8%)" : "none" }}>
                  <span className="text-[#d4c5b0]/30">together</span>
                </span>
              </span>
            </h2>

            <div className="relative mt-4 flex size-16 items-center justify-center sm:size-20">
              <div
                className="pointer-events-none absolute inset-0 rounded-full border transition-all ease-out"
                style={{
                  borderColor: isHovered ? "#d4c5b0" : "rgba(212,197,176,0.2)",
                  backgroundColor: isHovered && !isClicked ? "#d4c5b0" : "transparent",
                  transform: isClicked ? "scale(3)" : isHovered ? "scale(1.1)" : "scale(1)",
                  opacity: isClicked ? 0 : 1,
                  transitionDuration: isClicked ? "700ms" : "500ms",
                }}
              />
              <ArrowUpRight
                className="size-6 sm:size-7 transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: isClicked ? "translate(100px,-100px) scale(0.5)" : isHovered ? "translate(2px,-2px)" : "none",
                  opacity: isClicked ? 0 : 1,
                  color: isHovered && !isClicked ? "black" : "#d4c5b0",
                  transitionDuration: isClicked ? "600ms" : "500ms",
                }}
              />
            </div>
          </div>

          <div className="absolute -left-8 top-1/2 -translate-y-1/2 sm:-left-16">
            <div className="h-px w-8 bg-[#d4c5b0]/20 transition-all duration-500 sm:w-12" style={{ transform: isHovered ? "scaleX(1.5)" : "scaleX(1)", opacity: isHovered ? 1 : 0.4 }} />
          </div>
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 sm:-right-16">
            <div className="h-px w-8 bg-[#d4c5b0]/20 transition-all duration-500 sm:w-12" style={{ transform: isHovered ? "scaleX(1.5)" : "scaleX(1)", opacity: isHovered ? 1 : 0.4 }} />
          </div>
        </div>

        {/* Subtext */}
        <div
          className="mt-8 flex flex-col items-center gap-4 text-center transition-all duration-500 delay-100"
          style={{ opacity: isClicked ? 0 : 1, transform: isClicked ? "translateY(20px)" : "none", pointerEvents: isClicked ? "none" : "auto" }}
        >
          <p className="max-w-md text-sm leading-relaxed text-[#d4c5b0]/40">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s create something exceptional together.
          </p>
          <span className="text-xs tracking-widest uppercase text-[#d4c5b0]/20">hello@eldom.com</span>
        </div>
      </div>
    </section>
  )
}
