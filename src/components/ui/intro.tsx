"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

const COLS = 6;

export default function Intro() {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  const word = "Eldo.";

  useEffect(() => {
    let i = 0;
    const speeds = [0, 160, 140, 200, 130, 170];
    const type = () => {
      if (i <= word.length) {
        setText(word.slice(0, i));
        const delay = i === 0 ? 700 : speeds[i] + Math.random() * 80 - 40;
        i++;
        setTimeout(type, delay);
      } else {
        setTimeout(() => setDone(true), 900);
      }
    };
    setTimeout(type, 700);
  }, []);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setGone(true), COLS * 80 + 900);
      return () => clearTimeout(t);
    }
  }, [done]);

  if (gone) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* columns */}
      {Array.from({ length: COLS }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0 bg-[#0a0a0a]"
          style={{ left: `${(i / COLS) * 100}%`, width: `${100 / COLS}%` }}
          initial={{ y: 0 }}
          animate={done ? { y: "-100%" } : { y: 0 }}
          transition={{
            duration: 1.1,
            ease: [0.76, 0, 0.24, 1],
            delay: done ? i * 0.07 : 0,
          }}
        />
      ))}

      {/* center content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6"
        animate={done ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Image src="/logo-w.svg" alt="logo" width={32} height={32} />
        <span className="text-white text-5xl font-bold tracking-tight">
          {text}
          <span className="inline-block w-[3px] h-[1em] bg-white/70 ml-1 align-middle animate-pulse" />
        </span>
      </motion.div>
    </div>
  );
}
