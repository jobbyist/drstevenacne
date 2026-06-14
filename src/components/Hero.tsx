import heroPoster from "@/assets/hero-poster.jpg";
import { ArrowRight, Sparkles } from "lucide-react";

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/8128107/8128107-uhd_2732_1440_25fps.mp4";

export function Hero({ onOpenAI }: { onOpenAI: () => void }) {
  return (
    <section className="relative overflow-hidden bg-mist">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster={heroPoster}
          preload="metadata"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      </div>

      <div className="relative container-px mx-auto max-w-[1400px] py-20 md:py-28 lg:py-36">
        <div className="max-w-[640px] animate-fade-up">
          <span className="eyebrow">Dermatologist developed · 20 years of clinical experience</span>
          <h1 className="mt-5 font-serif text-[2.6rem] sm:text-6xl lg:text-[5rem] leading-[0.95] text-primary text-balance">
            Clearer skin,<br />
            <span className="italic text-clinical">backed by science.</span>
          </h1>
          <p className="mt-6 text-[15px] md:text-lg leading-relaxed text-primary/75 max-w-[520px]">
            A four-step routine engineered for acne-prone skin — without the redness, the dryness, or
            the guesswork. Built on two decades of dermatology research.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#shop"
              className="group inline-flex items-center gap-2 h-12 px-7 rounded-full bg-primary text-primary-foreground text-sm font-semibold tracking-wide hover:bg-ink transition"
            >
              Shop the regimen <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={onOpenAI}
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-primary/20 bg-background/70 text-primary text-sm font-semibold tracking-wide hover:border-clinical hover:text-clinical transition"
            >
              <Sparkles className="h-4 w-4" /> Build my routine with Steven AI
            </button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            {[
              ["94%", "fewer breakouts in 8 weeks"],
              ["4.9★", "average regimen rating"],
              ["20yr+", "of clinical experience"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-serif text-2xl md:text-3xl text-primary">{n}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground leading-snug">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
