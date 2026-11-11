import type { Metadata } from "next"
import Hero from "@/components/layout/home/hero"
import AboutMe from "@/components/layout/about/aboutme"
import AboutFocus from "@/components/layout/about/focus"
import Certifications from "@/components/layout/about/certifications"

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Eldo Macuácua — a Websites & Digital Products Developer from Mozambique.",
  alternates: { canonical: "https://eldom.com/about" },
  openGraph: { url: "https://eldom.com/about" },
}

export default function AboutPage() {
  return (
    <main>
      <Hero />
      <AboutMe />
      <AboutFocus />
      <Certifications />
    </main>
  )
}
