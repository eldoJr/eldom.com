"use client"

import { useEffect, useRef } from "react"

export default function Cursor() {
  const dotRef    = useRef<HTMLDivElement>(null)
  const squareRef = useRef<HTMLDivElement>(null)
  const innerRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return

    document.documentElement.style.cursor = "none"

    let mx = -200, my = -200
    let sx = -200, sy = -200
    let raf: number

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`
        dotRef.current.style.top  = `${my}px`
      }

      sx = lerp(sx, mx, 0.09)
      sy = lerp(sy, my, 0.09)

      if (squareRef.current) {
        squareRef.current.style.left = `${sx}px`
        squareRef.current.style.top  = `${sy}px`
      }

      raf = requestAnimationFrame(tick)
    }

    const getTarget = (el: Element | null) => el?.closest("a, button, [data-cursor]")

    const onOver = (e: MouseEvent) => {
      const entered = getTarget(e.target as Element)
      const from    = getTarget(e.relatedTarget as Element)
      if (entered && entered !== from && innerRef.current) {
        innerRef.current.style.width   = "56px"
        innerRef.current.style.height  = "56px"
        innerRef.current.style.opacity = "0.6"
      }
    }

    const onOut = (e: MouseEvent) => {
      const left    = getTarget(e.target as Element)
      const entered = getTarget(e.relatedTarget as Element)
      if (left && left !== entered && innerRef.current) {
        innerRef.current.style.width   = "36px"
        innerRef.current.style.height  = "36px"
        innerRef.current.style.opacity = "1"
      }
    }

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseover", onOver)
    document.addEventListener("mouseout", onOut)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseout", onOut)
      cancelAnimationFrame(raf)
      document.documentElement.style.cursor = ""
    }
  }, [])

  return (
    <>
      {/* Dot — instant follow */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed z-[99999] -translate-x-1/2 -translate-y-1/2 will-change-[left,top]"
      >
        <div className="w-[5px] h-[5px] rounded-full bg-[#d4c5b0]" />
      </div>

      {/* Square — lagging + zooms on hover */}
      <div
        ref={squareRef}
        aria-hidden
        className="pointer-events-none fixed z-[99998] -translate-x-1/2 -translate-y-1/2 will-change-[left,top]"
      >
        <div
          ref={innerRef}
          style={{
            width: "36px",
            height: "36px",
            opacity: 1,
            border: "1px solid rgba(212,197,176,0.45)",
            borderRadius: "3px",
            transition: "width 0.4s cubic-bezier(0.16,1,0.3,1), height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
          }}
        />
      </div>
    </>
  )
}
