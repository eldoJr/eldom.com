import type { Metadata } from "next"
import Hero from "@/components/layout/home/hero"
import Contact from "@/components/sections/contact"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Eldo Macuácua — available for projects, collaborations, and opportunities.",
  alternates: { canonical: "https://eldom.com/contact" },
  openGraph: { url: "https://eldom.com/contact" },
}

export default function ContactPage() {
  return (
    <main>
      <Hero />
      <Contact />
    </main>
  )
}
