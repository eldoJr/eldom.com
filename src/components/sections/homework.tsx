"use client"

import dynamic from "next/dynamic"
import { useInView } from "@/lib/useinview"
import { useEffect, useRef, useState } from "react"

const LoopGallery = dynamic(() => import("@/components/ui/loop-gallery"), { ssr: false })

const PROJECTS = [
  {
    title: "Eldom.com",
    image: "https://cdn.21st.dev/assets/mirror/b2/b226346ec34fe24bbe9082488ff7f2c84d7150de914648cac41eeabe17579811.jpg",
    category: "Full-Stack",
    year: "2025",
    description: "Personal portfolio — Next.js, Tailwind, TypeScript",
    preview: "https://eldom.com",
    github: "https://github.com/eldoJr/eldom.com",
  },
  {
    title: "Pulse Dashboard",
    image: "https://cdn.21st.dev/assets/mirror/e4/e4aa6feebdf90e8f95fd1b23df1134252323f1a8431bacf6cce347a6872a36b1.jpg",
    category: "Web App",
    year: "2024",
    description: "Real-time analytics dashboard — React, Recharts, Supabase",
    preview: "https://example.com",
    github: "https://github.com/eldoJr/pulse",
  },
  {
    title: "Forma UI",
    image: "https://cdn.21st.dev/assets/mirror/fb/fb1f483387b6207cca218e17983266d323e2c4b77cdfb689a697e465e659ad96.jpg",
    category: "Design System",
    year: "2024",
    description: "Component library with dark mode — Radix, CVA, Storybook",
    preview: "https://example.com",
    github: "https://github.com/eldoJr/forma-ui",
  },
  {
    title: "Drift API",
    image: "https://cdn.21st.dev/assets/mirror/77/775ac71e6498243369b483fc1e8fc660d968f60dc692cef40ca3a453615de65a.jpg",
    category: "Backend",
    year: "2023",
    description: "REST + WebSocket service — Node.js, Prisma, PostgreSQL",
    preview: "https://example.com",
    github: "https://github.com/eldoJr/drift-api",
  },
  {
    title: "Lens Mobile",
    image: "https://cdn.21st.dev/assets/mirror/bc/bcfc0cf9a756c7a9efab688f3d4f64e16d88ca943b81056da21827a0e94c33a8.jpg",
    category: "Mobile",
    year: "2024",
    description: "AI-powered photo tagging app — React Native, TensorFlow Lite",
    preview: "https://example.com",
    github: "https://github.com/eldoJr/lens",
  },
]

const GALLERY_HEIGHT = 600

const fade = (inView: boolean, delay = 0) =>
  `transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${inView ? "opacity-100" : "opacity-0"} [transition-delay:${delay}ms]`

export default function Work() {
  const { ref, inView } = useInView(0.1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scrollIndex, setScrollIndex] = useState(0)

  // Scroll budget starts once the sticky block is pinned at top.
  // We measure how far the wrapper has scrolled past its own top edge.
  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrolled = Math.max(0, -rect.top)
      const idx = Math.min(
        Math.floor(scrolled / GALLERY_HEIGHT),
        PROJECTS.length - 1
      )
      setScrollIndex(idx)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Scroll budget = one GALLERY_HEIGHT per project transition
  const wrapperHeight = `calc(100vh + ${(PROJECTS.length - 1) * GALLERY_HEIGHT}px)`

  return (
    <section
      ref={(el) => {
        (ref as React.MutableRefObject<HTMLElement | null>).current = el
      }}
      id="work"
      className="relative z-10 bg-white rounded-t-[1.5rem]"
    >
      {/* Sticky wrapper — header + gallery pin together */}
      <div ref={wrapperRef} style={{ height: wrapperHeight }} className="relative">
        <div className="sticky top-0 pt-20 pb-10">
          <div className="px-10 md:px-20 pb-10">
            <p className={fade(inView, 0) + " text-xs tracking-[0.25em] uppercase text-neutral-400 mb-4"}>Selected work</p>
            <h2 className={fade(inView, 100) + " text-3xl md:text-5xl font-bold tracking-tight text-neutral-900"}>
              Some Things I&apos;ve Built.
            </h2>
          </div>
          <div className={fade(inView, 200) + " px-10 md:px-20"}>
            <div className="rounded-2xl overflow-hidden">
              <LoopGallery
                projects={PROJECTS}
                height={GALLERY_HEIGHT}
                scrollIndex={scrollIndex}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={fade(inView, 300) + " px-10 md:px-20 py-10"}>
        <a href="/work" className="group flex items-center gap-2 text-base text-neutral-600 hover:text-neutral-900 transition-colors">
          See all work
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
        <hr className="border-neutral-100 mt-6" />
      </div>
    </section>
  )
}
