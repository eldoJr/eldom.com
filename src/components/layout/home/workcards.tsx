"use client"

import { useRef } from "react"
import { useTransform, motion, useScroll, MotionValue } from "motion/react"

const PROJECTS = [
  {
    title: "Investor-Ready Website for Mobility",
    type: "Tech Startup",
    tags: ["Tech Startup", "UI Design", "Framer Development"],
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

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1])
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale, top: `calc(-4vh + ${i * 24}px)` }}
        className="relative w-[82%] max-w-5xl origin-top"
      >
        <div className="relative overflow-hidden rounded-2xl" style={{ height: "68vh" }}>
          <motion.img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ scale: imageScale }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-7 py-6">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-white/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-white/50">{type}</p>
              <p className="mt-1 text-base font-semibold text-white leading-snug max-w-xs">{title}</p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className="flex flex-col items-end gap-1">
                {tags.map((tag) => (
                  <span key={tag} className="text-[11px] text-white/40 tracking-wide">{tag}</span>
                ))}
              </div>
              <a href={preview} target="_blank" rel="noopener noreferrer" className="group mt-1">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
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

export default function WorkCards() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <section className="relative z-10 bg-white rounded-b-[1.5rem]">
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
      <div className="px-10 md:px-20 py-16">
        <a
          href="/work"
          className="group flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-200"
        >
          See all work
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5" aria-hidden>
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>
    </section>
  )
}
