import type { Metadata } from "next"
import Hero from "@/components/layout/home/hero"
import WorkHero from "@/components/sections/workhero"

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects and work by Eldo Macuácua — websites, dashboards, and digital systems.",
  alternates: { canonical: "https://eldom.com/work" },
  openGraph: { url: "https://eldom.com/work" },
}

export default function WorkPage() {
  return (
    <main>
      <Hero />
      <WorkHero />
    </main>
  )
}
