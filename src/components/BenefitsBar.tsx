import { ShieldCheck, Beaker, Droplet, HeartPulse } from "lucide-react";

const BENEFITS = [
  { icon: ShieldCheck, label: "Dermatologist developed" },
  { icon: Droplet, label: "Non-comedogenic · won't clog pores" },
  { icon: HeartPulse, label: "Clinically inspired formulas" },
  { icon: Beaker, label: "Science-backed actives" },
];

export function BenefitsBar() {
  return (
    <section className="border-y border-border bg-sand">
      <div className="container-px mx-auto max-w-[1400px] py-6 md:py-7">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {BENEFITS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 text-primary">
              <Icon className="h-5 w-5 text-clinical shrink-0" strokeWidth={1.6} />
              <span className="text-[12px] md:text-[13px] tracking-[0.04em] font-medium leading-snug">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
