import Image from "next/image";
import GradientWaves from "@/components/ui/waves";
import Typewriter from "@/components/ui/typewriter";

export default function hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <GradientWaves
          horizonColor="#5227FF"
          waveColor="#FF9FFC"
          crestColor="#ffffff"
          backgroundColor="#080b14"
          tilt={64}
          amplitude={2.5}
          speed={0.4}
          relief={1}
          grain={0.2}
          intro
          mouseInteraction
          swellOnClick
        />
      </div>

      {/* top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-6">
        <Image src="/logo-w.svg" alt="logo" width={22} height={22} />
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-300"
        >
          Resume
        </a>
      </div>

      {/* content */}
      <div className="relative z-10 px-10 md:px-20 max-w-5xl">
        <p className="text-white/50 text-4xl md:text-6xl tracking-tight mb-2">
          Sup, I&apos;m <span className="font-bold text-white">Eldo.</span>
        </p>
        <p className="text-4xl md:text-6xl tracking-tight text-white/50">
          I&apos;m a <Typewriter />
        </p>

        <p className="text-[18px] text-white/40 max-w-sm leading-relaxed">
          Passionately creating innovative digital experiences, rooted in user needs.
        </p>

        {/* scroll indicator */}
        <div className="flex items-center gap-3 mt-8">
          <div className="flex items-center gap-[4px]">
            <span className="w-[2px] h-4 bg-white/40 rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-[2px] h-4 bg-white/60 rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-[2px] h-4 bg-white rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
          <span className="text-[11px] tracking-[0.25em] uppercase text-white/60 font-medium">scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
