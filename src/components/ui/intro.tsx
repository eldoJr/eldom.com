"use client"

import { useState, useEffect } from "react"

const TEXT = "Eldo,"
const CHAR_INTERVAL = 130
const HOLD = 1800

export default function Intro() {
  const [gone, setGone] = useState(false)
  const [typed, setTyped] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++
      setTyped(TEXT.slice(0, i))
      if (i === TEXT.length) {
        clearInterval(id)
        let visible = true
        const blink = setInterval(() => {
          visible = !visible
          setCursorVisible(visible)
        }, 480)
        setTimeout(() => {
          clearInterval(blink)
          setFading(true)
          setTimeout(() => setGone(true), 700)
        }, HOLD)
      }
    }, CHAR_INTERVAL)
    return () => clearInterval(id)
  }, [])

  if (gone) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      style={{ opacity: fading ? 0 : 1, transition: "opacity 0.7s ease" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: "-5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "900px",
          background: "radial-gradient(ellipse 50% 55% at 50% 25%, rgba(212,197,176,0.55) 0%, rgba(212,197,176,0.1) 45%, transparent 65%)",
          filter: "blur(90px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to bottom, black 0%, transparent 18%, transparent 78%, black 100%)" }}
      />
      <h1
        className="relative z-10 flex items-center font-black text-[#d4c5b0] select-none"
        style={{ fontSize: "clamp(3.5rem, 11vw, 9rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
      >
        {typed}
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: "0.06em",
            height: "0.85em",
            marginLeft: "0.06em",
            background: "#d4c5b0",
            borderRadius: "1px",
            verticalAlign: "middle",
            opacity: cursorVisible ? 1 : 0,
            transition: "opacity 0.05s",
          }}
        />
      </h1>
    </div>
  )
}
