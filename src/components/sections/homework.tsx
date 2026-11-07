"use client"

import { useRef } from "react"
import { useTransform, motion, useScroll, MotionValue } from "motion/react"
import { useInView } from "@/lib/useinview"

const PROJECTS = [
  {
    title: "Eldom.com",
    category: "Full-Stack · 2025",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80",
    preview: "https://eldom.com",
    github: "https://github.com/eldoJr/eldom.com",
  },
  {
    title: "Pulse Dashboard",
    category: "Web App · 2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    preview: "https://example.com",
    github: "https://github.com/eldoJr/pulse",
  },
  {
    title: "Forma UI",
    category: "Design System · 2024",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&q=80",
    preview: "https://example.com",
    github: "https://github.com/eldoJr/forma-ui",
  },
  {
    title: "Drift API",
    category: "Backend · 2023",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",
    preview: "https://example.com",
    github: "https://github.com/eldoJr/drift-api",
  },
]

interface CardProps {
  i: number
  title: string
  category: string
  image: string
  preview: string
  github: string
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}

function ProjectCard({ i, title, category, image, preview, github, progress, range, targetScale }: CardProps) {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1])
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale, top: `calc(-4vh + ${i * 24}px)` }}
        className="relative w-[92%] max-w-5xl rounded-2xl overflow-hidden origin-top border border-white/[0.06]"
      >
        {/* image */}
        <div className="relative overflow-hidden" style={{ height: "62vh" }}>
          <motion.img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ scale: imageScale }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </div>

        {/* bottom bar */}
        <div className="flex items-center justify-between px-7 py-5 bg-[#080b14]">
          <div>
            <p className="text-white font-semibold text-base tracking-tight">{title}</p>
            <p className="text-white/30 text-xs mt-0.5">{category}</p>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={preview}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors duration-200"
            >
              Preview
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden>
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors duration-200"
            >
              GitHub
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden>
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </a>
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
      ref={(el) => {
        ;(ref as React.MutableRefObject<HTMLElement | null>).current = el
      }}
      id="work"
      className="relative z-10 bg-white rounded-t-[1.5rem]"
    >
      {/* Header */}
      <div className="px-10 md:px-20 pt-24 pb-10">
        <p
          className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-4 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)" }}
        >
          Selected work
        </p>
        <h2
          className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:100ms]"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)" }}
        >
          Some Things I&apos;ve Built.
        </h2>
      </div>

      {/* Stacking cards */}
      <div ref={container}>
        {PROJECTS.map((p, i) => (
          <ProjectCard
            key={i}
            i={i}
            title={p.title}
            category={p.category}
            image={p.image}
            preview={p.preview}
            github={p.github}
            progress={scrollYProgress}
            range={[i / PROJECTS.length, 1]}
            targetScale={1 - (PROJECTS.length - i) * 0.04}
          />
        ))}
      </div>

      {/* Footer */}
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
