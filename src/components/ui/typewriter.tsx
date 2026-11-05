"use client";

import { useEffect, useState } from "react";

const roles = [
  "Full-Stack Developer",
  "AIML Enthusiast",
  "UI/UX Tinkerer",
  "Open Source Nerd",
  "Coffee-Driven Coder",
];

export default function typewriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 60);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 35);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <span className="text-white/90">
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-white/70 ml-0.5 align-middle animate-pulse" />
    </span>
  );
}
