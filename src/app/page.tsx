"use client"

import Hero from "@/components/sections/homehero"
import Work from "@/components/sections/homework"
import Experience from "@/components/sections/homeexperience"
import AboutExperience from "@/components/sections/experience"
import Certifications from "@/components/sections/certifications"
import HomeAbout from "@/components/sections/homeabout"
import AboutBento from "@/components/sections/aboutbento"
import { useSection } from "@/lib/section"

function TabSections() {
  const { section } = useSection()

  if (section === "About") return <><AboutBento /><AboutExperience /><Certifications /></>

  // Home (default) — all home sections
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
      <TabSections />
    </main>
  )
}
