"use client"

import { useEffect, useRef } from "react"

const WORDS = ["design.", "prototype.", "solve.", "build.", "develop.", "ship."]

export default function WorkScroll() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    el.style.setProperty("--count", String(WORDS.length))
    el.style.setProperty("--start", "35vh")
    el.style.setProperty("--space", "30vh")
  }, [])

  return (
    <div
      ref={rootRef}
      className="relative"
      style={{ "--count": WORDS.length } as React.CSSProperties}
    >
      <style>{`
        .wh-scroll-area {
          background: white;
          border-radius: 1.5rem 1.5rem 0 0;
        }
        .wh-header {
          position: sticky;
          top: calc((var(--count) - 1) * -1lh);
          z-index: 1;
          line-height: 1.2;
          display: flex;
          align-items: start;
          width: 100%;
          margin-bottom: var(--space, 30vh);
          font-size: clamp(3rem, 8vw, 7rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #171717;
        }
        .wh-header-inner {
          display: flex;
          width: 100%;
          align-items: start;
          justify-content: flex-start;
          padding-top: calc(var(--start, 35vh) - 0.5lh);
          padding-left: clamp(2.5rem, 5vw, 5rem);
          gap: 0.35em;
        }
        .wh-prefix {
          position: sticky;
          top: calc(var(--start, 35vh) - 0.5lh);
          margin: 0;
          color: #171717;
          white-space: nowrap;
        }
        .wh-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .wh-list li {
          background: linear-gradient(
            180deg,
            color-mix(in oklch, #171717, transparent 75%) 0 calc(var(--start, 35vh) - 0.5lh),
            #171717 calc(var(--start, 35vh) - 0.55lh) calc(var(--start, 35vh) + 0.55lh),
            color-mix(in oklch, #171717, transparent 75%) calc(var(--start, 35vh) + 0.5lh)
          );
          background-attachment: fixed;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
        }
      `}</style>

      <div className="wh-scroll-area">
        <header className="wh-header">
          <div className="wh-header-inner">
            <h2 className="wh-prefix">I can</h2>
            <ul className="wh-list">
              {WORDS.map((word, i) => (
                <li key={i}>{word}</li>
              ))}
            </ul>
          </div>
        </header>
      </div>
    </div>
  )
}
