import { useEffect, useState } from "react";
import { X, TrendingUp, CheckCircle2 } from "lucide-react";

const KEY = "dsa-psa-last-shown";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const FIRST_DELAY_MS = 30_000;

export function PSAModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const last = localStorage.getItem(KEY);
    const now = Date.now();
    let delay = FIRST_DELAY_MS;
    if (last) {
      const elapsed = now - Number(last);
      if (elapsed < WEEK_MS) return; // already shown this week
      delay = FIRST_DELAY_MS;
    }
    const t = setTimeout(() => {
      setOpen(true);
      localStorage.setItem(KEY, String(Date.now()));
    }, delay);
    return () => clearTimeout(t);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-primary/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-lg bg-background rounded-2xl shadow-product overflow-hidden border border-border">
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-4 right-4 h-9 w-9 rounded-full bg-background/80 hover:bg-mist inline-flex items-center justify-center text-primary z-10"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="bg-gradient-to-br from-primary to-clinical text-primary-foreground p-7 md:p-9">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold bg-primary-foreground/15 px-3 py-1.5 rounded-full">
            <TrendingUp className="h-3.5 w-3.5" /> Public Service Announcement
          </div>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl leading-tight">
            South Africans — earn more with Dr Steven Acne.
          </h2>
          <p className="mt-3 text-primary-foreground/85 text-[15px] leading-relaxed">
            Join our growing community of independent distributors selling dermatologist-developed acne care across SA. Flexible income, clinical-grade products, full training.
          </p>
        </div>
        <div className="p-7 md:p-9">
          <ul className="space-y-2.5">
            {[
              "Up to 35% commission on every order",
              "Free starter kit + marketing toolkit",
              "Weekly payouts via EFT",
              "No minimum stock — order on demand",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[14px] text-primary">
                <CheckCircle2 className="h-4 w-4 text-clinical mt-0.5 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:distributors@drstevenacne.co.za?subject=Distributor%20Application"
              className="flex-1 h-12 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-[13px] uppercase tracking-[0.18em] hover:bg-ink transition"
            >
              Apply to distribute
            </a>
            <button
              onClick={() => setOpen(false)}
              className="h-12 px-5 rounded-full border border-border text-primary text-[13px] font-medium hover:bg-mist transition"
            >
              Maybe later
            </button>
          </div>
          <p className="mt-4 text-[11px] text-muted-foreground text-center">Open to South African residents 18+. Terms apply.</p>
        </div>
      </div>
    </div>
  );
}
