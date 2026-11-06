"use client"

import Hero from "@/components/sections/homehero"
import Work from "@/components/sections/homework"
import Experience from "@/components/sections/homeexperience"
import HomeAbout from "@/components/sections/homeabout"
import AboutBento from "@/components/sections/aboutbento"
import { useSection } from "@/lib/section"

function TabSections() {
  const { section } = useSection()

  if (section === "About") return <AboutBento />

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
