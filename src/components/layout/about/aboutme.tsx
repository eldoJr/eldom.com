"use client"

import { useInView } from "@/lib/useinview"

const hobbyImages = [
  "/images/h1.png",
  "/images/h2.png",
  "/images/h3.png",
  "/images/h4.png",
  "/images/h5.jpeg",
]

export default function AboutMe() {
  const { ref, inView } = useInView(0.1)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative z-10 bg-black px-6 md:px-20 py-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

        {/* Left: label + text */}
        <div
          className="md:col-span-5 flex flex-col gap-6 pt-2 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transitionDelay: "100ms" }}
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#d4c5b0]/40">About Me</span>

          <p className="text-[#d4c5b0] text-base leading-relaxed">
            Away from work, I enjoy playing football and relaxing with a book or a game of chess. I participate in hackathons and play games when I need to take a break. Digital systems design is not only what I do for my job, but also a hobby that I truly enjoy.
          </p>
        </div>

        {/* Right: horizontal infinite carousel */}
        <div
          className="md:col-span-7 overflow-hidden transition-[opacity] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: inView ? 1 : 0, transitionDelay: "250ms" }}
        >
          <div
            className="flex gap-4"
            style={{ animation: "scrollX 40s linear infinite", width: "max-content" }}
          >
            {[...hobbyImages, ...hobbyImages].map((src, i) => (
              <div key={i} className="group flex-shrink-0 overflow-hidden rounded-sm" style={{ height: "280px" }}>
                <img
                  src={src}
                  alt={`hobby-${i}`}
                  className="h-full w-auto object-cover rounded-sm grayscale hover:grayscale-0 transition-[filter] duration-500"
                  style={{ filter: undefined }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes scrollX {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
