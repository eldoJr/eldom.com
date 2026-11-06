import type { project, social } from "@/types";

export const projects: project[] = [
  {
    title: "Eldom.com",
    description: "Personal portfolio built with Next.js, Tailwind CSS, and TypeScript. Focused on performance and clean UI.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    url: "https://eldom.com",
    repo: "https://github.com/eldoJr/eldom.com",
  },
  {
    title: "Pulse Dashboard",
    description: "Real-time analytics dashboard with live charts, user segmentation, and event tracking.",
    tags: ["React", "Recharts", "Supabase"],
    url: "https://example.com",
    repo: "https://github.com/eldoJr/pulse",
  },
  {
    title: "Forma UI",
    description: "Accessible component library with dark mode support, built on Radix primitives.",
    tags: ["Radix", "CVA", "Storybook"],
    url: "https://example.com",
    repo: "https://github.com/eldoJr/forma-ui",
  },
  {
    title: "Drift API",
    description: "High-performance REST and WebSocket service with role-based auth and real-time events.",
    tags: ["Node.js", "Prisma", "PostgreSQL"],
    url: "https://example.com",
    repo: "https://github.com/eldoJr/drift-api",
  },
  {
    title: "Lens Mobile",
    description: "AI-powered photo tagging and organisation app for iOS and Android.",
    tags: ["React Native", "TensorFlow Lite"],
    url: "https://example.com",
    repo: "https://github.com/eldoJr/lens",
  },
];

export const socials: social[] = [
  { label: "github",   url: "https://github.com/eldoJr" },
  { label: "linkedin", url: "https://linkedin.com/in/eldom" },
  { label: "twitter",  url: "https://twitter.com/eldom" },
  { label: "email",    url: "mailto:hello@eldom.com" },
];
