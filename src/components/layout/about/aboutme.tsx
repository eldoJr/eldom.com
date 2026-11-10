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
      className="relative z-10 bg-black px-10 md:px-20 py-24"
    >
      <div className="grid grid-cols-12 gap-8 items-start">

        {/* Left: label + text */}
        <div
          className="col-span-5 flex flex-col gap-6 pt-2 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transitionDelay: "100ms" }}
        >
          <span className="text-xs text-[#d4c5b0]/50 tracking-widest">[ ABOUT ME ]</span>

          <p className="text-[#d4c5b0] text-base leading-relaxed">
            Away from work, I enjoy playing football and relaxing with a book or a game of chess. I participate in hackathons and play games when I need to take a break. Digital systems design is not only what I do for my job, but also a hobby that I truly enjoy.
          </p>
        </div>

        {/* Right: horizontal infinite carousel */}
        <div
          className="col-span-7 overflow-hidden transition-[opacity] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: inView ? 1 : 0, transitionDelay: "250ms" }}
        >
          <div
            className="flex gap-4"
            style={{ animation: "scrollX 40s linear infinite", width: "max-content" }}
          >
            {[...hobbyImages, ...hobbyImages].map((src, i) => (
              <div key={i} className="flex-shrink-0 overflow-hidden rounded-sm" style={{ height: "340px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`hobby-${i}`}
                  className="h-full w-auto object-cover rounded-sm"
                  style={{ filter: "sepia(15%) brightness(0.88) contrast(1.05)" }}
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
