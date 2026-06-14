import dermatologist from "@/assets/dermatologist.jpg";
import { Quote } from "lucide-react";

export function Science() {
  return (
    <section id="science" className="py-20 md:py-32 bg-background">
      <div className="container-px mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <span className="eyebrow">Built on evidence, not trends</span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl text-primary text-balance">
            A dermatologist's clinic, <br/><span className="italic text-clinical">distilled into a bottle.</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
            For two decades Dr Steven has treated acne-prone skin in clinic — from teenage breakouts to
            adult hormonal cycles. Every formula here is the result of that practice: actives at
            clinically meaningful concentrations, paired with barrier-supporting ingredients so your
            skin clears <em>without</em> the irritation typically associated with acne treatments.
          </p>
          <ul className="mt-8 space-y-3 text-[15px] text-primary/85">
            {[
              "Salicylic acid (BHA) — dissolves keratin plugs deep inside pores.",
              "Niacinamide — calms inflammation and regulates sebum.",
              "Zinc PCA — controls oil and supports skin repair.",
              "Ceramides + glycerin — rebuild the moisture barrier.",
            ].map((t) => (
              <li key={t} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-clinical shrink-0" />{t}</li>
            ))}
          </ul>

          <figure className="mt-10 border-l-2 border-clinical pl-5 max-w-xl">
            <Quote className="h-5 w-5 text-clinical mb-2" />
            <blockquote className="font-serif text-xl md:text-2xl text-primary leading-snug">
              "Acne is not a hygiene problem. It's a biological one — and it responds beautifully to
              the right ingredients used consistently."
            </blockquote>
            <figcaption className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Dr Steven · Founder, Dr Steven Acne
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-mist">
            <img src={dermatologist} alt="Dr Steven, founder dermatologist" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div className="absolute bottom-6 left-6 right-6 bg-background/95 backdrop-blur rounded-xl p-5 shadow-soft">
              <div className="eyebrow">20 years in practice</div>
              <p className="mt-2 text-sm text-primary leading-relaxed">
                Trained at leading dermatology institutions. Active research in inflammatory acne and
                post-inflammatory hyperpigmentation in skin of colour.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
