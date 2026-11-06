"use client";

import * as React from "react";

interface ProjectData {
  title: string;
  image: string;
  category: string;
  year: string;
  description: string;
  preview?: string;
  github?: string;
}

const LERP_FACTOR = 0.12;
const BUFFER_SIZE = 2;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const getItem = (data: ProjectData[], index: number) =>
  data[((index % data.length) + data.length) % data.length];

const padNum = (index: number, total: number) =>
  (((index % total) + total) % total + 1).toString().padStart(2, "0");

export interface LoopGalleryProps {
  projects: ProjectData[];
  height?: number;
  scrollIndex?: number; // driven by parent scroll position
}

export default function LoopGallery({ projects, height = 600, scrollIndex = 0 }: LoopGalleryProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = React.useState({ min: -BUFFER_SIZE, max: BUFFER_SIZE });

  const MINIMAP_H = 200;

  const s = React.useRef({
    currentY: 0,
    targetY: 0,
    itemHeight: height,
    settled: true,
  });

  const projectsRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const minimapRef  = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const infoRef     = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const rafRef      = React.useRef<number>(0);
  const renderedRange = React.useRef({ min: -BUFFER_SIZE, max: BUFFER_SIZE });

  // Drive targetY directly from scrollIndex — no snap needed, lerp handles smoothing
  React.useEffect(() => {
    const st = s.current;
    const target = -scrollIndex * st.itemHeight;
    if (target === st.targetY) return;
    st.targetY = target;
    st.settled = false;
  }, [scrollIndex]);

  React.useEffect(() => {
    s.current.itemHeight = height;
  }, [height]);

  const updatePositions = React.useCallback(() => {
    const st = s.current;
    const minimapY = (st.currentY * MINIMAP_H) / st.itemHeight;

    projectsRef.current.forEach((el, index) => {
      el.style.transform = `translateY(${index * st.itemHeight + st.currentY}px)`;
      const img = el.querySelector<HTMLImageElement>("img");
      if (img) {
        if (!img.dataset.py) img.dataset.py = "0";
        let cur = parseFloat(img.dataset.py);
        cur = lerp(cur, (-st.currentY - index * st.itemHeight) * 0.18, 0.18);
        img.style.transform = `translateY(${cur}px) scale(1.4)`;
        img.dataset.py = String(cur);
      }
    });

    minimapRef.current.forEach((el, index) => {
      el.style.transform = `translateY(${index * MINIMAP_H + minimapY}px)`;
      const img = el.querySelector<HTMLImageElement>("img");
      if (img) {
        if (!img.dataset.py) img.dataset.py = "0";
        let cur = parseFloat(img.dataset.py);
        cur = lerp(cur, (-minimapY - index * MINIMAP_H) * 0.18, 0.18);
        img.style.transform = `translateY(${cur}px) scale(1.4)`;
        img.dataset.py = String(cur);
      }
    });

    infoRef.current.forEach((el, index) => {
      el.style.transform = `translateY(${index * MINIMAP_H + minimapY}px)`;
    });
  }, []);

  React.useEffect(() => {
    const loop = () => {
      const st = s.current;

      if (!st.settled) {
        const diff = st.targetY - st.currentY;
        if (Math.abs(diff) < 0.5) {
          st.currentY = st.targetY;
          st.settled = true;
        } else {
          st.currentY += diff * LERP_FACTOR;
        }

        updatePositions();

        const idx = Math.round(-st.currentY / st.itemHeight);
        const min = idx - BUFFER_SIZE;
        const max = idx + BUFFER_SIZE;
        if (min !== renderedRange.current.min || max !== renderedRange.current.max) {
          renderedRange.current = { min, max };
          setVisibleRange({ min, max });
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [updatePositions]);

  const indices: number[] = [];
  for (let i = visibleRange.min; i <= visibleRange.max; i++) indices.push(i);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-neutral-950 select-none"
      style={{ height }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {indices.map((i) => {
          const d = getItem(projects, i);
          return (
            <div
              key={i}
              ref={(el) => { el ? projectsRef.current.set(i, el) : projectsRef.current.delete(i); }}
              className="absolute inset-x-0 top-0 overflow-hidden"
              style={{ height, willChange: "transform" }}
            >
              <img src={d.image} alt={d.title} className="absolute inset-0 w-full h-full object-cover" draggable={false} style={{ willChange: "transform" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
              <div className="absolute bottom-8 left-8 right-8 z-10">
                <div className="flex gap-2 mb-4">
                  {d.preview && (
                    <a href={d.preview} target="_blank" rel="noopener noreferrer" aria-label="Live preview" className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-3 py-1.5 rounded-full backdrop-blur-sm transition-[color,border-color] duration-200">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      Live
                    </a>
                  )}
                  {d.github && (
                    <a href={d.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-3 py-1.5 rounded-full backdrop-blur-sm transition-[color,border-color] duration-200">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      Code
                    </a>
                  )}
                </div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2 font-medium">{d.category} &mdash; {d.year}</p>
                <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight leading-tight mb-1">{d.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed max-w-sm">{d.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* minimap */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-3 items-end">
        <div className="relative overflow-hidden rounded-lg" style={{ width: 80, height: MINIMAP_H }}>
          {indices.map((i) => {
            const d = getItem(projects, i);
            return (
              <div key={i} ref={(el) => { el ? minimapRef.current.set(i, el) : minimapRef.current.delete(i); }} className="absolute inset-x-0 top-0 overflow-hidden rounded-lg" style={{ height: MINIMAP_H, willChange: "transform" }}>
                <img src={d.image} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" draggable={false} style={{ willChange: "transform" }} />
              </div>
            );
          })}
          <div className="absolute inset-0 rounded-lg ring-1 ring-white/30 pointer-events-none" />
        </div>
        <div className="relative overflow-hidden" style={{ height: MINIMAP_H, width: 160 }}>
          {indices.map((i) => {
            const d = getItem(projects, i);
            const num = padNum(i, projects.length);
            return (
              <div key={i} ref={(el) => { el ? infoRef.current.set(i, el) : infoRef.current.delete(i); }} className="absolute top-0 left-0 w-full flex flex-col justify-between py-2" style={{ height: MINIMAP_H, willChange: "transform" }}>
                <div className="flex justify-between text-[11px] text-white/50"><p>{num}</p><p>{d.title}</p></div>
                <div className="flex justify-between text-[11px] text-white/30"><p>{d.category}</p><p>{d.year}</p></div>
                <div className="text-[11px] text-white/20"><p>{d.description}</p></div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute top-8 right-8 z-20 flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white/30">
        <span>scroll</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
      </div>
      <div className="absolute top-8 left-8 z-20 text-[11px] tracking-[0.2em] uppercase text-white/30">
        {padNum(scrollIndex, projects.length)} / {String(projects.length).padStart(2, "0")}
      </div>
    </div>
  );
}
