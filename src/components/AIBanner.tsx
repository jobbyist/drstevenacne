import clearSkin from "@/assets/clear-skin.jpg";
import { Sparkles, ArrowRight } from "lucide-react";

export function AIBanner({ onOpenAI }: { onOpenAI: () => void }) {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 20% 30%, white 0, transparent 40%), radial-gradient(circle at 80% 70%, white 0, transparent 35%)",
      }} />
      <div className="container-px mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        <div className="lg:col-span-7">
          <span className="text-[11px] uppercase tracking-[0.22em] text-clinical font-semibold inline-flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5" /> Introducing Steven AI
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.02] text-balance">
            Your personal acne consult,<br/>
            <span className="italic text-clinical">available 24/7.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-primary-foreground/75 max-w-xl leading-relaxed">
            Chat through your skin profile, lifestyle, and current routine. Steven AI builds a custom
            regimen — products, application order, lifestyle adjustments — drawing on Dr Steven's two
            decades of clinical practice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onOpenAI}
              className="group inline-flex items-center gap-2 h-12 px-7 rounded-full bg-clinical text-clinical-foreground text-sm font-semibold tracking-wide hover:brightness-110 transition"
            >
              Start my consult <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a href="#shop" className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-primary-foreground/25 text-sm font-semibold tracking-wide hover:bg-primary-foreground/10 transition">
              Browse products
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl text-primary-foreground/85">
            {["Skin profile", "Lifestyle audit", "Custom routine", "Ingredient swaps"].map((t) => (
              <div key={t} className="text-[12px] uppercase tracking-[0.16em] font-medium">{t}</div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-mist/10">
            <img src={clearSkin} alt="Clear, healthy skin" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
