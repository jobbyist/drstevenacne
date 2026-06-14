import productRange from "@/assets/product-range.jpg";

const STEPS = [
  { n: "01", title: "Cleanse", body: "Acne Control Cleanser sweeps away oil, sweat, and impurities — twice daily.", time: "AM + PM" },
  { n: "02", title: "Treat", body: "Acne Treatment Gel targets active breakouts and calms redness on contact.", time: "PM" },
  { n: "03", title: "Hydrate", body: "Acne Control Moisturizer restores moisture without clogging pores.", time: "AM + PM" },
  { n: "04", title: "Protect", body: "Acne Defence SPF 50+ shields skin from UV and post-acne dark marks.", time: "AM" },
];

export function Regimen() {
  return (
    <section id="regimen" className="py-20 md:py-28 bg-mist">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5">
            <span className="eyebrow">The four-step regimen</span>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl text-primary text-balance">
              One routine. <span className="italic text-clinical">Clear, predictable results.</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-base md:text-lg max-w-md">
              Acne care doesn't need to be complicated. Four products, used consistently — that's the
              system Dr Steven's clinic has refined over twenty years.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-background border border-border pl-2 pr-5 py-2">
              <span className="h-7 w-7 rounded-full bg-clinical text-clinical-foreground text-xs font-semibold inline-flex items-center justify-center">8w</span>
              <span className="text-[13px] text-primary/80">Visible improvement in 4–8 weeks of consistent use.</span>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden bg-background shadow-soft">
              <img src={productRange} alt="The Dr Steven Acne four-step regimen" className="w-full h-auto" loading="lazy" />
            </div>
          </div>
        </div>

        <ol className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
          {STEPS.map((s) => (
            <li key={s.n} className="bg-background p-7 md:p-8 group hover:bg-sand transition">
              <div className="flex items-center justify-between mb-6">
                <span className="font-serif text-3xl text-clinical">{s.n}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">{s.time}</span>
              </div>
              <h3 className="font-serif text-2xl text-primary">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
