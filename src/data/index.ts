import type { project, social } from "@/types";

export const projects: project[] = [
  {
    title: "project one",
    description: "short description of what this project does.",
    tags: ["next.js", "typescript", "tailwind"],
    url: "https://example.com",
    repo: "https://github.com/eldom/project-one",
  },
];

export const socials: social[] = [
  { label: "github", url: "https://github.com/eldom" },
  { label: "twitter", url: "https://twitter.com/eldom" },
];
