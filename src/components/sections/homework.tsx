"use client"

import dynamic from "next/dynamic"
import { useInView } from "@/lib/useinview"

const MorphGallery = dynamic(() => import("@/components/ui/gallery"), { ssr: false })

const ITEMS = [
  { src: "https://cdn.21st.dev/assets/mirror/ec/eceae69f56b5b3e29b9372032b5c22e96bd5fc9c167ce072813868aa871d52af.jpg", thumb: "https://cdn.21st.dev/assets/mirror/69/69dbb246d917da410f7e79e87e53aaf6302023baa9db05f1075fca5bcb255410.jpg", alt: "Sun rays through a forest", title: "Forest Light", preview: "https://example.com", github: "https://github.com/eldoJr" },
  { src: "https://cdn.21st.dev/assets/mirror/95/95b854c8c5fc73249ba12e729548a432ff171dab87d960e2aaf098f1db941828.jpg", thumb: "https://cdn.21st.dev/assets/mirror/3d/3d637a6ebf76a17643434f0a6939ae4a0e15853797ba886588071bf792dd12d9.jpg", alt: "Snow-capped mountain peak at night", title: "Night Summit", preview: "https://example.com", github: "https://github.com/eldoJr" },
  { src: "https://cdn.21st.dev/assets/mirror/15/15a4a367001c723a22cc1f5b480cfdc6abc1e50fdf87e0555ddd324f404fb98a.jpg", thumb: "https://cdn.21st.dev/assets/mirror/b8/b88e4af2580633f65cd2fce4867c647be4e317e3bf54c47dac854aab211e6dde.jpg", alt: "Mountain reflected in a still lake", title: "Still Reflection", preview: "https://example.com", github: "https://github.com/eldoJr" },
  { src: "https://cdn.21st.dev/assets/mirror/69/6947b2d1b15fc6614fe30af02282fe6418b3c43556fbfe6ad8e2fa16c72ae700.jpg", thumb: "https://cdn.21st.dev/assets/mirror/e0/e025ceb111646f4030ac36225aa4997e5024d098c4c939c409cddd281bd2c314.jpg", alt: "Aerial view of green hills", title: "Green Canopy", preview: "https://example.com", github: "https://github.com/eldoJr" },
  { src: "https://cdn.21st.dev/assets/mirror/40/40907f0afb67e9bf2767a5982d24f0d56e6f49dd12b859cf92eb9b3b9771f4a4.jpg", thumb: "https://cdn.21st.dev/assets/mirror/38/38b66ef8fe46060a916db605710e709522a9534ff72aa549c1233c543f0a92a9.jpg", alt: "Orange wildflower field", title: "Wildflower", preview: "https://example.com", github: "https://github.com/eldoJr" },
  { src: "https://cdn.21st.dev/assets/mirror/ef/ef4b96d0e0de49e89f600b77edbe0a150e1f93f8ba92ae1422d285d267b7bd47.jpg", thumb: "https://cdn.21st.dev/assets/mirror/f8/f8ee65346d7a36d4a795ca4628042627baa2f3f5e1c79d1dd471f874c8a6f0a4.jpg", alt: "Tropical beach with clear water", title: "Coastal Drift", preview: "https://example.com", github: "https://github.com/eldoJr" },
]

const fade = (inView: boolean, delay = 0) =>
  `transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${inView ? "opacity-100" : "opacity-0"}`
  + ` [transition-delay:${delay}ms]`

export default function Work() {
  const { ref, inView } = useInView(0.1)

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="work" className="relative z-10 bg-white rounded-t-[1.5rem] overflow-hidden">

      {/* header */}
      <div className="px-10 md:px-20 pt-20 pb-12">
        <p className={fade(inView, 0) + " text-xs tracking-[0.25em] uppercase text-neutral-400 mb-4"}>Selected work</p>
        <h2 className={fade(inView, 100) + " text-3xl md:text-5xl font-bold tracking-tight text-neutral-900"}>
          Some Things I&apos;ve Built.
        </h2>
      </div>

      {/* gallery */}
      <div className={fade(inView, 200) + " px-10 md:px-20 pb-10 will-change-[opacity]"}>
        <div className="mx-auto max-w-5xl rounded-2xl overflow-hidden contain-layout">
          <MorphGallery items={ITEMS} height="65vh" autoplay={4500} />
        </div>
      </div>

      {/* see all */}
      <div className={fade(inView, 300) + " px-10 md:px-20 pb-20"}>
        <a href="/work" className="group flex items-center gap-2 text-base text-neutral-600 hover:text-neutral-900 transition-colors">
          See all work
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
        <hr className="border-neutral-100 mt-6" />
      </div>

    </section>
  )
}
