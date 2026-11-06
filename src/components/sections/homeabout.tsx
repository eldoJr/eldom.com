"use client"

import Image from "next/image"
import { useInView } from "@/lib/useinview"

export default function About() {
  const { ref, inView } = useInView(0.15)

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="about" className="relative z-10 bg-[#080b14] px-10 md:px-20 py-24">
      <div className="flex items-start gap-16">

        <p
          className="text-4xl md:text-6xl font-normal tracking-tight text-white leading-[1.1] max-w-3xl transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-32px)" }}
        >
          I love to inspire, because I know what it&apos;s like to be inspired. Seeing design work and having fun, that&apos;<span className="text-neutral-500">s all about.</span>
        </p>

        <div
          className="shrink-0 w-64 md:w-80 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:150ms]"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(32px)" }}
        >
          <Image
            src="/images/me.png"
            alt="Photo of me"
            width={320}
            height={400}
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>

      </div>
    </section>
  )
}
