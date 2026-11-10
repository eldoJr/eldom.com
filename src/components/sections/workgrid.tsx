"use client"

import { useRef } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
import { useInView } from "@/lib/useinview"

const PROJECTS = [
  {
    title: "Eldom.com",
    description: "Personal portfolio built with Next.js, Tailwind CSS, and TypeScript.",
    services: ["Full-Stack", "UI Design", "App Design"],
    year: "2025",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80",
    url: "https://eldom.com",
  },
  {
    title: "Pulse Dashboard",
    description: "Real-time analytics dashboard with live charts and event tracking.",
    services: ["Web App", "Data Viz", "Concepting"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    url: "https://example.com",
  },
  {
    title: "Forma UI",
    description: "Component library with dark mode, built on Radix and documented with Storybook.",
    services: ["Design System", "App Design", "Prototyping"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&q=80",
    url: "https://example.com",
  },
  {
    title: "Drift API",
    description: "High-performance REST and WebSocket service with real-time event streaming.",
    services: ["Backend", "Architecture", "API Design"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",
    url: "https://example.com",
  },
  {
    title: "Lens Mobile",
    description: "AI-powered photo tagging app built with React Native and TensorFlow Lite.",
    services: ["Mobile", "AI/ML", "App Design"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80",
    url: "https://example.com",
  },
  {
    title: "Nomad CMS",
    description: "Headless CMS with a visual editor, multi-locale support, and webhook integrations.",
    services: ["Full-Stack", "Concepting", "Service Design"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&q=80",
    url: "https://example.com",
  },
]

export default function WorkGrid() {
  const { ref, inView } = useInView(0.05)
  const wrapRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "start start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, 0])

  return (
    <motion.div ref={wrapRef} style={{ y, marginTop: "-2px" }} className="relative z-20">
      <section className="bg-[#202020] rounded-t-[1.5rem] px-10 md:px-20 py-24">

        <div
          className="mb-16 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transitionDelay: "100ms" }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-white/30 mb-5">Selected work</p>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-2xl leading-tight">
            Some Things<br />I&apos;ve Built.
          </h3>
          <p className="mt-6 text-base text-white/40 max-w-md leading-relaxed">
            A collection of projects, experiments, and ideas turned into reality.
          </p>
        </div>

        <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16">
          {PROJECTS.map((p, i) => (
            <a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(28px)",
                transitionDelay: inView ? `${i * 100}ms` : "0ms",
              }}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-[#2a2a2a]">
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-base font-semibold text-white tracking-tight">{p.title}</p>
                  <p className="text-sm text-white/40 mt-0.5 leading-snug">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.services.map((s, j) => (
                      <span key={j} className="text-[11px] text-white/40 border border-white/[0.1] px-2.5 py-1 rounded-full">
                        {j === 0 ? s : `/${s}`}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-white/20 shrink-0 mt-0.5">{p.year}</span>
              </div>
            </a>
          ))}
        </div>

      </section>
    </motion.div>
  )
}
