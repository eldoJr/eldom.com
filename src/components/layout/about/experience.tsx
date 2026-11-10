"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useInView } from "@/lib/useinview"

const experiences = [
  {
    company: "All Source & Logistic",
    companyUrl: undefined as string | undefined,
    role: "Home Office Intern",
    period: "2025 – 2026",
    location: "Vadodara, India",
    type: "Internship",
    link: undefined as { label: string; url: string } | undefined,
    bullets: [
      "Applied full-stack development concepts across frontend interfaces, backend programming, and database technologies.",
      "Continuously expanded technical expertise through online courses, workshops, and hands-on development.",
    ],
    stack: ["Full-Stack", "Frontend", "Backend", "Databases"],
  },
  {
    company: "PANLEEN",
    companyUrl: undefined as string | undefined,
    role: "Help Desk Technician",
    period: "2023 – 2024",
    location: "Maputo, Mozambique",
    type: "Full-time",
    link: undefined as { label: string; url: string } | undefined,
    bullets: [
      "Delivered technical support and troubleshooting for hardware, software, and user-related issues.",
      "Configured and maintained hardware and software environments to support reliable IT operations.",
    ],
    stack: ["Help Desk", "Hardware", "Software", "IT Support"],
  },
  {
    company: "TEACHNOOK",
    companyUrl: "https://www.linkedin.com/company/teachnook",
    role: "Artificial Intelligence Intern",
    period: "Jan – Feb 2025",
    location: "Remote",
    type: "Internship",
    link: { label: "View Offer Letter", url: "https://drive.google.com/file/d/1d3rPRWqzkgqUde-s2kNBs7prtwwyhwi2/view?usp=sharing" },
    bullets: [
      "Played an active role in developing and implementing AI solutions with emphasis on machine learning models, data pre-processing, and algorithm optimization.",
      "Implemented predictive analytics pipelines using Python, TensorFlow, NumPy, and Pandas across multiple projects.",
      "Developed AI-based prototypes that increased team efficiency and productivity.",
      "Explored NLP, computer vision, and reinforcement learning concepts through applied research.",
      "Collaborated across teams using Git, Trello, and Zoom in a fully remote environment.",
    ],
    stack: ["Python", "TensorFlow", "NumPy", "Pandas", "NLP"],
  },
  {
    company: "LAUNCHED",
    companyUrl: "https://www.linkedin.com/company/launchedglobal/?originalSubdomain=in",
    role: "Web Application Developer Intern",
    period: "Jan – Feb 2025",
    location: "Remote",
    type: "Internship",
    link: { label: "View Offer Letter", url: "https://drive.google.com/file/d/1guLs6WaJDh_Z1OXrv3sOLbYVher-cLWT/view?usp=sharing" },
    bullets: [
      "Built web applications using HTML, CSS, JavaScript, React, and Bootstrap alongside Python, PHP, MySQL, and Java.",
      "Developed and shipped innovative IT solutions across multiple client-facing projects.",
      "Resolved technical issues and improved workflows to ensure high client satisfaction.",
      "Gained hands-on experience in software development, automation, and system integration.",
      "Managed version control and project tracking with Git and GitHub.",
    ],
    stack: ["React", "JavaScript", "Python", "PHP", "MySQL", "Git"],
  },
  {
    company: "WKB COMERCIAL",
    companyUrl: "https://www.facebook.com/WKBSALES",
    role: "IT Support Technician",
    period: "May 2021 – Jun 2022",
    location: "On-site",
    type: "Full-time",
    link: undefined as { label: string; url: string } | undefined,
    bullets: [
      "Provided technical support for hardware and software issues, ensuring minimal downtime for end-users.",
      "Installed, configured, and maintained desktops, printers, and networking devices.",
      "Diagnosed and resolved technical problems promptly, achieving a high customer satisfaction rate.",
      "Configured routers and switches to maintain secure and stable network connectivity.",
      "Documented processes and solutions to streamline future troubleshooting and improve team efficiency.",
    ],
    stack: ["Windows Server", "TeamViewer", "Microsoft Office", "Networking"],
  },
]

const D = 1000;
const EASE_OUT = "cubic-bezier(0.16,1,0.3,1)";
const EASE_IN  = "cubic-bezier(0.4,0,1,1)";

export default function Experience() {
  const { ref, inView } = useInView(0.1)
  const [active, setActive] = useState(0)
  const [displayed, setDisplayed] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const exp = experiences[displayed]
  const isAnimating = useRef(false)

  const slideIn = () => {
    const el = panelRef.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>("[data-line]").forEach((line, j) => {
      line.style.transform = "translateY(105%)";
      line.animate(
        [{ transform: "translateY(105%)" }, { transform: "translateY(0%)" }],
        { duration: D, delay: j * 60, easing: EASE_OUT, fill: "forwards" }
      );
    });
  }

  // slide in on first mount and whenever displayed changes
  useEffect(() => { slideIn(); }, [displayed])

  const switchTab = useCallback(async (i: number) => {
    if (i === active || isAnimating.current) return;
    isAnimating.current = true;
    setActive(i);
    const el = panelRef.current;
    if (!el) { setDisplayed(i); isAnimating.current = false; return; }

    const lines = Array.from(el.querySelectorAll<HTMLElement>("[data-line]"));
    await Promise.all(
      lines.map((line, j) =>
        line.animate(
          [{ transform: "translateY(0%)" }, { transform: "translateY(-105%)" }],
          { duration: 280, delay: j * 25, easing: EASE_IN, fill: "forwards" }
        ).finished
      )
    );
    setDisplayed(i);
    isAnimating.current = false;
  }, [active])

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="experience"
      className="relative z-10 bg-[#080b14] pt-20 pb-24"
    >
      <div className="px-10 md:px-20">

        {/* header */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1) 0ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 0ms" }}>
          <p className="text-xs tracking-[0.25em] uppercase text-white/25 mb-4">Experience</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-16">
            Where I&apos;ve Worked.<sup className="text-xl md:text-2xl font-semibold ml-1 text-white/30">({experiences.length})</sup>
          </h2>
        </div>

        {/* body */}
        <div
          className="flex gap-12 items-start"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1) 100ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 100ms" }}
        >
          {/* left — company list */}
          <div className="flex flex-col w-52 shrink-0 border-l-2 border-white/[0.06]">
            {experiences.map((e, i) => (
              <button
                key={i}
                onClick={() => switchTab(i)}
                className={`relative h-14 px-5 text-left text-sm transition-colors duration-200 ${
                  active === i ? "text-white font-medium" : "text-white/30 hover:text-white/60"
                }`}
              >
                {active === i && <span className="absolute left-[-2px] top-0 h-full w-[2px] bg-white" />}
                {e.company}
              </button>
            ))}
          </div>

          {/* right — detail panel */}
          <div ref={panelRef} className="flex-1">

            {/* role + meta */}
            <div className="overflow-hidden mb-8">
              <div data-line style={{ transform: "translateY(105%)" }}>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-xl font-semibold text-white leading-snug">
                    {exp.role}
                    {exp.companyUrl ? (
                      <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                        {" "}@ {exp.company}
                      </a>
                    ) : (
                      <span className="text-white/40"> @ {exp.company}</span>
                    )}
                  </h3>
                  {exp.link && (
                    <a
                      href={exp.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-[11px] text-white/40 hover:text-white border border-white/[0.08] hover:border-white/30 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {exp.link.label} ↗
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-white/40">
                  <span>{exp.period}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>{exp.location}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.06] text-white/40">{exp.type}</span>
                </div>
              </div>
            </div>

            {/* divider */}
            <hr className="border-white/[0.06] mb-8" />

            {/* bullets */}
            <div className="overflow-hidden mb-8">
              <ul className="flex flex-col gap-4" data-line style={{ transform: "translateY(105%)" }}>
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex gap-4 text-sm leading-relaxed">
                    <span className="text-white/20 shrink-0 text-xs mt-[3px] tabular-nums">0{i + 1}</span>
                    <span className="text-white/60">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* stack */}
            <div className="overflow-hidden">
              <div className="flex flex-wrap gap-2" data-line style={{ transform: "translateY(105%)" }}>
                {exp.stack.map(s => (
                  <span key={s} className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] text-white/40 border border-white/[0.07]">
                    {s}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
