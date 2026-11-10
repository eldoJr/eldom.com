import Hero from "@/components/layout/home/hero"
import WhatIDo from "@/components/layout/home/whatido"
import Work from "@/components/layout/home/work"
import Experience from "@/components/layout/home/experience"
import HomeAbout from "@/components/layout/home/about"

export default function Page() {
  return (
    <main>
      <Hero />
      <WhatIDo />
      <Work />
      <Experience />
      <HomeAbout />
    </main>
  )
}
