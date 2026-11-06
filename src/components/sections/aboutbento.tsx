"use client"

import Image from "next/image"
import { useInView } from "@/lib/useinview"
import { useEffect, useRef, useState } from "react"
import { VscCode } from "react-icons/vsc"
import { SiFigma, SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql, SiGit, SiVercel } from "react-icons/si"

const ACTIVITIES = [
  "Play Football", "Read Books", "Code", "Music & Movies",
  "Solve Problems", "Gaming", "Hackathons", "Play Chess",
]

const TOOLS = [
  { name: "VS Code",    icon: VscCode },
  { name: "Figma",      icon: SiFigma },
  { name: "Next.js",    icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind",   icon: SiTailwindcss },
  { name: "Postgres",   icon: SiPostgresql },
  { name: "Git",        icon: SiGit },
  { name: "Vercel",     icon: SiVercel },
]

const SERVICES = [
  "Web Design", "Mobile Design", "UI Design", "UX Audit",
  "Design System", "Visual Branding", "Interactive Prototyping",
  "Platform Redesign", "Usability Consulting",
]

const f = (inView: boolean, delay = 0): React.CSSProperties => ({
  opacity: inView ? 1 : 0,
  transform: inView ? "none" : "translateY(16px)",
  transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
})

function MusicCard({ inView }: { inView: boolean }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(28)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (playing) {
      timer.current = setInterval(() => setProgress(p => p >= 100 ? 0 : +(p + 0.25).toFixed(2)), 100)
    } else {
      if (timer.current) clearInterval(timer.current)
    }
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [playing])

  const elapsed = progress * 2.54
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`

  return (
    <div className="relative rounded-xl overflow-hidden bg-[#0c0e1a] border border-white/[0.06] flex flex-col h-full" style={f(inView, 400)}>
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-transparent to-fuchsia-950/20 pointer-events-none" />

      {/* disc — half peeking from top center */}
      <div className="relative flex justify-center" style={{ height: 110 }}>
        <div
          className="absolute -top-[70px] w-[140px] h-[140px] rounded-full overflow-hidden ring-1 ring-white/10"
          style={{ animation: "disc-spin 4s linear infinite" }}
        >
          <Image src="/images/luther.png" alt="luther" fill className="object-cover" />
          <div className="absolute inset-[32%] rounded-full bg-[#0c0e1a]" />
        </div>
      </div>

      {/* content */}
      <div className="relative px-4 pb-4 flex flex-col gap-3">
        <p className="text-[9px] tracking-[0.2em] uppercase text-white/25 text-center">Now Playing</p>
        <div className="text-center">
          <p className="text-white text-xs font-semibold">luther</p>
          <p className="text-white/35 text-[10px]">Kendrick Lamar & SZA</p>
        </div>
        <div>
          <div className="h-[1.5px] w-full bg-white/[0.08] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full transition-[width] duration-100" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between mt-1 text-[9px] text-white/20">
            <span>{fmt(elapsed)}</span><span>4:14</span>
          </div>
        </div>
      </div>
      <style>{`@keyframes disc-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function AboutBento() {
  const { ref, inView } = useInView(0.05)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="about-bento"
      className="relative z-10 bg-[#080b14] px-6 md:px-16 py-20"
    >
      <div className="max-w-5xl mx-auto">

        {/* header */}
        <div className="mb-8" style={f(inView, 0)}>
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/25 mb-2">About</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">The person behind the work.</h2>
        </div>

        {/* row 1 — photo + brief */}
        <div className="grid grid-cols-12 gap-3 mb-3">

          {/* photo */}
          <div className="col-span-4 rounded-xl overflow-hidden relative" style={{ ...f(inView, 80), aspectRatio: "1214 / 1295" }}>
            <Image src="/images/me.png" alt="Eldo" fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 text-[9px] tracking-widest uppercase text-white/40">Eldo</span>
          </div>

          {/* brief */}
          <div className="col-span-8 rounded-xl bg-white/[0.03] border border-white/[0.05] p-5 flex flex-col justify-between" style={f(inView, 120)}>
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase text-white/25 mb-3">Me in brief</p>
              <p className="text-white/70 text-sm leading-relaxed">
                I&apos;m Eldo António Macuácua, from Inhambane, a province in Mozambique popularly known as the &ldquo;Terra de Boa Gente.&rdquo;
              </p>
              <p className="text-white/70 text-sm leading-relaxed mt-3">
                I am a creative, dependable, passionate, results-oriented individual who possesses strong moral principles and integrity. I have an enthusiastic attitude along with great communication skills, excellent organizational skills, and attention to detail.
              </p>
              <p className="text-white/40 text-xs leading-relaxed mt-3">
                Currently pursuing a B.Tech in Information Technology &amp; Engineering (2024–2028) at{" "}
                <a href="https://paruluniversity.ac.in" target="_blank" rel="noopener noreferrer" className="font-semibold text-white/60 hover:text-white underline underline-offset-2 transition-colors">Parul University</a>, India.
              </p>
            </div>

          </div>
        </div>

        {/* row 2 — activities + tools + music */}
        <div className="grid grid-cols-12 gap-3 mb-3">

          {/* activities */}
          <div className="col-span-5 rounded-xl bg-white/[0.03] border border-white/[0.05] p-5" style={f(inView, 160)}>
            <p className="text-[9px] tracking-[0.2em] uppercase text-white/25 mb-3">Things I love</p>
            <div className="flex flex-wrap gap-1.5">
              {ACTIVITIES.map(a => (
                <span key={a} className="text-[11px] px-3 py-1.5 rounded-full border border-white/[0.07] text-white/50 hover:text-white/80 hover:border-white/15 transition-colors cursor-default">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* tools */}
          <div className="col-span-4 rounded-xl bg-white/[0.03] border border-white/[0.05] p-5" style={f(inView, 220)}>
            <p className="text-[9px] tracking-[0.2em] uppercase text-white/25 mb-3">Tools</p>
            <div className="grid grid-cols-2 gap-1.5">
              {TOOLS.map(t => (
                <div key={t.name} className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                  <t.icon className="text-white/40 text-sm shrink-0" />
                  <span className="text-[11px] text-white/50">{t.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* music */}
          <div className="col-span-3" style={f(inView, 280)}>
            <MusicCard inView={inView} />
          </div>
        </div>

        {/* row 3 — services full width */}
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-5" style={f(inView, 340)}>
          <p className="text-[9px] tracking-[0.2em] uppercase text-white/25 mb-4">Services</p>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map(s => (
              <span key={s} className="text-[11px] px-3 py-1.5 rounded-full border border-white/[0.07] text-white/50 hover:text-white/80 hover:border-white/15 transition-colors cursor-default">
                {s}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
