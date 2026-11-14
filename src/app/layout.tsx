import type { Metadata } from "next";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
import "@/styles/globals.css";
import Menu from "@/components/ui/menu";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/ui/smooth-scroll";
import Cursor from "@/components/ui/cursor";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://eldom.com"),
  title: {
    default: "Eldo Macuácua — Websites & Digital Products Developer",
    template: "%s — Eldo Macuácua",
  },
  description: "Websites & Digital Products Developer — building fast, scalable, and beautifully crafted digital experiences from Mozambique.",
  keywords: ["Full-Stack Developer", "Web Developer", "UI/UX", "Next.js", "React", "Mozambique", "Eldo Macuácua", "Portfolio", "SaaS", "Dashboard"],
  authors: [{ name: "Eldo Macuácua", url: "https://eldom.com" }],
  creator: "Eldo Macuácua",
  openGraph: {
    type: "website",
    url: "https://eldom.com",
    title: "Eldo Macuácua — Websites & Digital Products Developer",
    description: "Websites & Digital Products Developer — building fast, scalable, and beautifully crafted digital experiences from Mozambique.",
    siteName: "Eldo Macuácua",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Eldo Macuácua — Websites & Digital Products Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eldo Macuácua — Websites & Digital Products Developer",
    description: "Websites & Digital Products Developer — building fast, scalable, and beautifully crafted digital experiences from Mozambique.",
    images: ["/og.png"],
    creator: "@eldomacuacua",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://eldom.com",
  },
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${plusJakarta.variable}`}>
      <body>
          <SmoothScroll />
          <Cursor />
          {children}
          <Footer />
          <Menu />
      </body>
    </html>
  );
}
