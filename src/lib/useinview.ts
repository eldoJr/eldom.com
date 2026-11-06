"use client"

import { useEffect, useRef, useState } from "react"

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)
  const thresholdRef = useRef(threshold)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: thresholdRef.current }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, []) // stable — threshold is read once at mount, element ref is stable

  return { ref, inView }
}
