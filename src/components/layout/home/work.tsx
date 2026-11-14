"use client"

import { useRef } from "react"
import { useTransform, motion, useScroll, MotionValue } from "motion/react"
import { useInView } from "@/lib/useinview"

const PROJECTS = [
  {
    title: "Investor-Ready Website for Mobility",
    type: "Tech Startup",
    tags: ["UI Design", "Framer", "Development"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80",
    preview: "https://eldom.com",
  },
  {
    title: "Pulse Dashboard",
    type: "Web Application",
    tags: ["Web App", "Data Viz", "React"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    preview: "https://example.com",
  },
  {
    title: "Forma UI",
    type: "Design System",
    tags: ["Design System", "Tokens", "Figma"],
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&q=80",
    preview: "https://example.com",
  },
  {
    title: "Drift API",
    type: "Backend",
    tags: ["Backend", "Node.js", "REST"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",
    preview: "https://example.com",
  },
]

interface CardProps {
  i: number
  title: string
  type: string
  tags: string[]
  image: string
  preview: string
  total: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}

function ProjectCard({ i, title, type, tags, image, preview, total, progress, range, targetScale }: CardProps) {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1])
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale, top: `calc(-4vh + ${i * 20}px)` }}
        className="relative w-[92%] md:w-[82%] max-w-5xl origin-top"
      >
        <div
          className="relative overflow-hidden rounded-xl md:rounded-2xl"
          style={{ height: "clamp(280px, 62vh, 680px)" }}
        >
          <motion.img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ scale: imageScale }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-5 py-5 md:px-7 md:py-6">
            {/* Left */}
            <div>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-white/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-1.5 text-[10px] md:text-[11px] font-semibold tracking-[0.15em] uppercase text-white/50">{type}</p>
              <p className="mt-1 text-sm md:text-base font-semibold text-white leading-snug max-w-[200px] md:max-w-xs">{title}</p>
            </div>

            {/* Right */}
            <div className="flex flex-col items-end gap-2 md:gap-3">
              <div className="hidden md:flex flex-col items-end gap-1">
                {tags.map((tag) => (
                  <span key={tag} className="text-[11px] text-white/40 tracking-wide">{tag}</span>
                ))}
              </div>
              <a href={preview} target="_blank" rel="noopener noreferrer" className="group">
                <svg width="34" height="34" viewBox="0 0 36 36" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <circle cx="18" cy="18" r="17" stroke="white" strokeOpacity="0.25" strokeWidth="1" />
                  <line x1="13" y1="23" x2="23" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <polyline points="15,13 23,13 23,21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <span className="text-[10px] text-white/30 tracking-widest">
                {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Work() {
  const { ref, inView } = useInView(0.05)
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <section
      ref={(el) => { ;(ref as React.MutableRefObject<HTMLElement | null>).current = el }}
      id="work"
      className="relative z-10 rounded-t-[1.5rem]"
      style={{ background: "#11100d" }}
    >
      {/* Header */}
      <div className="px-6 md:px-20 pt-20 md:pt-24 pb-8 md:pb-10">
        <p
          className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#d4c5b0]/40 mb-3 md:mb-4 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)" }}
        >
          Selected work
        </p>
        <h2
          className="text-3xl md:text-6xl font-bold tracking-tight text-[#d4c5b0] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:100ms]"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)" }}
        >
          Featured.<span className="text-[#d4c5b0]/30"> Things I&apos;ve Built.</span>
        </h2>
      </div>

      {/* Stacking cards */}
      <div ref={container} className="relative">
        {PROJECTS.map((p, i) => (
          <ProjectCard
            key={i}
            i={i}
            title={p.title}
            type={p.type}
            tags={p.tags}
            image={p.image}
            preview={p.preview}
            total={PROJECTS.length}
            progress={scrollYProgress}
            range={[i / PROJECTS.length, 1]}
            targetScale={1 - (PROJECTS.length - i) * 0.04}
          />
        ))}
      </div>

      {/* Footer CTA */}
      <div className="px-6 md:px-20 py-12 md:py-16 border-t border-[#d4c5b0]/10">
        <a
          href="/work"
          className="group inline-flex items-center gap-3 text-xl md:text-3xl font-semibold text-[#d4c5b0] hover:gap-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          See all work
          <span className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-[#d4c5b0]/20 group-hover:border-[#d4c5b0] group-hover:bg-[#d4c5b0] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#d4c5b0]/50 group-hover:text-[#11100d] transition-colors duration-300">
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          </span>
        </a>
      </div>
    </section>
  )
}
