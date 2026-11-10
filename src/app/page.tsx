"use client"

import Hero from "@/components/layout/home/hero"
import WhatIDo from "@/components/layout/home/whatido"
import Work from "@/components/layout/home/work"
import WorkHero from "@/components/sections/workhero"
import Experience from "@/components/layout/home/experience"
import Certifications from "@/components/layout/about/certifications"
import AboutIntro from "@/components/layout/about/intro"
import AboutMe from "@/components/layout/about/aboutme"
import AboutFocus from "@/components/layout/about/focus"
import HomeAbout from "@/components/layout/home/about"
import Contact from "@/components/sections/contact"
import { useSection } from "@/lib/section"

function TabSections() {
  const { section } = useSection()

  if (section === "Contact") return <Contact />
  if (section === "About") return <><AboutIntro /><AboutMe /><AboutFocus /><Certifications /></>
  if (section === "Work") return <WorkHero />

  return (
    <>
      <WhatIDo />
      <Work />
      <Experience />
      <HomeAbout />
    </>
  )
}

export default function Page() {
  return (
    <main>
      <Hero />
      <TabSections />
    </main>
  )
}
