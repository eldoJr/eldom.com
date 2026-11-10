"use client"

import { useInView } from "@/lib/useinview"

const EXPERIENCES = [
  { company: "Company One",   role: "Frontend Engineer",    period: "01/24 - Current", location: "Remote" },
  { company: "Company Two",   role: "Full Stack Developer", period: "06/23 - 12/23",   location: "Lisbon" },
  { company: "Company Three", role: "UI Engineer",          period: "01/23 - 05/23",   location: "Porto"  },
  { company: "Company Four",  role: "React Developer",      period: "07/22 - 12/22",   location: "Remote" },
  { company: "Company Five",  role: "Junior Developer",     period: "01/22 - 06/22",   location: "Lisbon" },
]

export default function Experience() {
  const { ref, inView } = useInView(0.1)

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="experience" className="relative z-10 bg-white py-24 rounded-b-[1.5rem]">

      <h2
        className="px-10 md:px-20 text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-20 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)" }}
      >
        Worked with<sup className="text-2xl md:text-3xl font-semibold ml-1">({EXPERIENCES.length})</sup>
      </h2>

      <div>
        {EXPERIENCES.map((e, i) => (
          <div
            key={i}
            className="transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(20px)",
              transitionDelay: inView ? `${150 + i * 80}ms` : "0ms",
            }}
          >
            <hr className="border-neutral-200 ml-10 md:ml-20" />
            <div className="grid grid-cols-4 pl-10 md:pl-20 py-6 text-neutral-800 text-base">
              <span>{e.company}</span>
              <span>{e.role}</span>
              <span>{e.period}</span>
              <span>{e.location}</span>
            </div>
          </div>
        ))}
        <hr
          className="border-neutral-200 ml-10 md:ml-20 transition-opacity duration-700"
          style={{ opacity: inView ? 1 : 0, transitionDelay: `${150 + EXPERIENCES.length * 80}ms` }}
        />
      </div>

    </section>
  )
}
