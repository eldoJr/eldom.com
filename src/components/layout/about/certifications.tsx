"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "@/lib/useinview"

const certifications = [
  { title: "Data Privacy Fundamentals",                    issuer: "Etrain",     type: "Certificate", url: undefined as string | undefined },
  { title: "Data Visualization with Python",               issuer: "Etrain",     type: "Certificate", url: undefined as string | undefined },
  { title: "Java",                                          issuer: "HackerRank", type: "Certificate", url: undefined as string | undefined },
  { title: "Hardware and Operating System Essentials",     issuer: "IBM",        type: "Certificate", url: undefined as string | undefined },
  { title: "Hardware and Operating Systems Fundamentals",  issuer: "Etrain",     type: "Certificate", url: undefined as string | undefined },
  { title: "Information Technology (IT) Fundamentals",    issuer: "IBM",        type: "Certificate", url: undefined as string | undefined },
  { title: "Generative AI Skills for Data Scientists",     issuer: "Etrain",     type: "Certificate", url: undefined as string | undefined },
  { title: "Generative AI Skills for Software Developers", issuer: "Etrain",    type: "Certificate", url: undefined as string | undefined },
  { title: "Python",                                        issuer: "Etrain",     type: "Certificate", url: undefined as string | undefined },
  { title: "Python for Data Science",                      issuer: "IBM",        type: "Certificate", url: undefined as string | undefined },
  { title: "Tech (IT) Support Job Guide",                  issuer: "IBM",        type: "Certificate", url: undefined as string | undefined },
  { title: "AWS Educate Introduction to Generative AI",   issuer: "AWS",        type: "Certificate", url: undefined as string | undefined },
  { title: "IT Specialist - HTML and CSS",                 issuer: "Certiport",  type: "Licence",     url: undefined as string | undefined },
  { title: "JavaScript",                                    issuer: "HackerRank", type: "Certificate", url: undefined as string | undefined },
  { title: "Vadodara Hackathon 6.0",                       issuer: "PU",         type: "Certificate", url: undefined as string | undefined },
]

const DEFAULT_VISIBLE = 6

export default function Certifications() {
  const { ref, inView } = useInView(0.1)
  const [showAll, setShowAll] = useState(false)
  const [animatedCount, setAnimatedCount] = useState(0)
  const prevShowAll = useRef(false)

  const visible = showAll ? certifications : certifications.slice(0, DEFAULT_VISIBLE)

  useEffect(() => {
    if (inView && animatedCount < DEFAULT_VISIBLE) setAnimatedCount(DEFAULT_VISIBLE)
  }, [inView])

  useEffect(() => {
    if (showAll && !prevShowAll.current) setAnimatedCount(certifications.length)
    prevShowAll.current = showAll
  }, [showAll])

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="certifications" className="relative z-10 bg-white rounded-t-[1.5rem] py-24">

      <h2
        className="px-6 md:px-20 text-2xl sm:text-3xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-12 md:mb-20 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)" }}
      >
        Licenses &amp; Certifications<sup className="text-2xl md:text-3xl font-semibold ml-1">({certifications.length})</sup>
      </h2>

      <div>
        {visible.map((c, i) => (
          <div
            key={i}
            className="transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]"
            style={{
              opacity: i < animatedCount ? 1 : 0,
              transform: i < animatedCount ? "none" : "translateY(20px)",
              transitionDelay: i < animatedCount ? `${i >= DEFAULT_VISIBLE ? (i - DEFAULT_VISIBLE) * 80 : 150 + i * 80}ms` : "0ms",
            }}
          >
            <hr className="border-neutral-200 ml-6 md:ml-20" />
            <div className="pl-6 md:pl-20 pr-6 md:pr-20 py-5">
              {/* Mobile layout */}
              <div className="flex items-start justify-between gap-4 md:hidden">
                <span className="text-neutral-800 text-sm font-medium leading-snug">{c.title}</span>
                <span className="shrink-0 text-xs text-neutral-400">{c.type}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 md:hidden">
                <span className="text-xs text-neutral-500">{c.issuer}</span>
              </div>
              {/* Desktop layout */}
              <div className="hidden md:grid grid-cols-4 text-neutral-800 text-base">
                <span className="col-span-2">{c.title}</span>
                <span className="text-neutral-500">{c.issuer}</span>
                <span className="flex justify-end">
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors">
                      {c.type} ↗
                    </a>
                  ) : (
                    <span className="text-sm text-neutral-400">{c.type}</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
        <hr
          className="border-neutral-200 ml-6 md:ml-20 transition-opacity duration-700"
          style={{ opacity: animatedCount >= visible.length ? 1 : 0, transitionDelay: `${150 + visible.length * 80}ms` }}
        />
      </div>

      {/* view more / less */}
      <div
        className="px-6 md:px-20 mt-8 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ opacity: animatedCount >= DEFAULT_VISIBLE ? 1 : 0, transitionDelay: `${150 + DEFAULT_VISIBLE * 80 + 80}ms` }}
      >
        <button
          onClick={() => setShowAll(v => !v)}
          className="group flex items-center gap-2 text-base text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          {showAll ? "Show less" : `Show ${certifications.length - DEFAULT_VISIBLE} more`}
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={`transition-transform duration-300 ${showAll ? "group-hover:-translate-y-0.5 rotate-180" : "group-hover:translate-y-0.5"}`}
            aria-hidden
          >
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
        <hr className="border-neutral-100 mt-6" />
      </div>

    </section>
  )
}
