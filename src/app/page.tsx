"use client"

import Hero from "@/components/layout/home/hero"
import WhatIDo from "@/components/layout/home/whatido"
import Work from "@/components/layout/home/work"
import WorkHero from "@/components/sections/workhero"
import Experience from "@/components/layout/home/experience"
import AboutExperience from "@/components/sections/experience"
import Certifications from "@/components/sections/certifications"
import HomeAbout from "@/components/layout/home/about"
import AboutBento from "@/components/sections/aboutbento"
import Contact from "@/components/sections/contact"
import { useSection } from "@/lib/section"

function TabSections() {
  const { section } = useSection()

  if (section === "Contact") return <Contact />
  if (section === "About") return <><AboutBento /><AboutExperience /><Certifications /></>
  if (section === "Work") return <WorkHero />

  return (
    <>
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
      <WhatIDo />
      <TabSections />
    </main>
  )
}
