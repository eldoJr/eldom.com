"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface GooeyTextProps {
  texts: string[]
  morphTime?: number
  cooldownTime?: number
  className?: string
  textClassName?: string
  onComplete?: () => void
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
  onComplete,
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null)
  const text2Ref = React.useRef<HTMLSpanElement>(null)
  const onCompleteRef = React.useRef(onComplete)
  onCompleteRef.current = onComplete

  React.useEffect(() => {
    // text1 = outgoing, text2 = incoming
    // we morph from text1 → text2
    let index = 0 // index of the word currently morphing IN (text2)
    let morph = 0
    let cooldown = cooldownTime
    let time = Date.now()
    let rafId: number
    let done = false

    if (text1Ref.current) {
      text1Ref.current.textContent = ""
      text1Ref.current.style.opacity = "0"
      text1Ref.current.style.filter = ""
    }
    if (text2Ref.current) {
      text2Ref.current.textContent = texts[0]
      text2Ref.current.style.opacity = "0"
      text2Ref.current.style.filter = ""
    }

    const setMorph = (fraction: number) => {
      if (!text1Ref.current || !text2Ref.current) return
      // text2 fades in
      text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
      text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`
      // text1 fades out
      const inv = 1 - fraction
      text1Ref.current.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`
      text1Ref.current.style.opacity = `${Math.pow(inv, 0.4) * 100}%`
    }

    const animate = () => {
      if (done) return
      rafId = requestAnimationFrame(animate)

      const now = Date.now()
      const dt = (now - time) / 1000
      time = now

      cooldown -= dt

      if (cooldown > 0) {
        // holding — show text2 fully
        if (text1Ref.current && text2Ref.current) {
          text1Ref.current.style.opacity = "0"
          text1Ref.current.style.filter = ""
          text2Ref.current.style.opacity = "100%"
          text2Ref.current.style.filter = ""
        }
        return
      }

      // morphing phase
      morph -= cooldown // cooldown is negative, so this adds time
      cooldown = 0

      let fraction = morph / morphTime

      if (fraction >= 1) {
        // morph complete — advance to next word
        fraction = 1
        setMorph(fraction)

        index++

        if (index >= texts.length) {
          // all words shown
          done = true
          cancelAnimationFrame(rafId)
          setTimeout(() => onCompleteRef.current?.(), cooldownTime * 1000)
          return
        }

        // swap: text2 becomes text1, load next into text2
        if (text1Ref.current && text2Ref.current) {
          text1Ref.current.textContent = texts[index - 1]
          text2Ref.current.textContent = texts[index]
        }

        morph = 0
        cooldown = cooldownTime
        return
      }

      setMorph(fraction)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [texts, morphTime, cooldownTime])

  return (
    <div className={cn("relative", className)}>
      <svg className="absolute h-0 w-0" aria-hidden focusable="false">
        <defs>
          <filter id="threshold" x="-20%" y="-50%" width="140%" height="200%">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
      {/* Filtered layer must have real size, otherwise the filter region is empty */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ filter: "url(#threshold)" }}
      >
        <span ref={text1Ref} className={cn("absolute inline-block select-none text-center", textClassName)} />
        <span ref={text2Ref} className={cn("absolute inline-block select-none text-center", textClassName)} />
      </div>
    </div>
  )
}
