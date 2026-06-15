import { Logo } from "./Logo";
import { Instagram, Youtube, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container-px mx-auto max-w-[1400px] py-16 grid grid-cols-2 md:grid-cols-12 gap-10">
        <div className="col-span-2 md:col-span-4">
          <Logo />
          <p className="mt-5 text-sm text-muted-foreground max-w-xs leading-relaxed">
            Dermatologist-developed acne care. Built on twenty years of clinical practice, made for
            real skin and real life.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Youtube, Twitter].map((I, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 rounded-full border border-border inline-flex items-center justify-center text-primary hover:bg-mist transition"
              >
                <I className="h-4 w-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {[
          {
            title: "Shop",
            links: ["Cleanser", "Treatment Gel", "Moisturizer", "Sunscreen", "The Regimen"],
          },
          { title: "Help", links: ["Shipping", "Returns", "Contact", "FAQ"] },
          { title: "Brand", links: ["About Dr Steven", "Science", "Journal", "Press"] },
        ].map((col) => (
          <div key={col.title} className="md:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-clinical font-semibold">
              {col.title}
            </h4>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-primary/80 hover:text-clinical transition">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 md:col-span-2">
          <h4 className="text-[11px] uppercase tracking-[0.2em] text-clinical font-semibold">
            Stay informed
          </h4>
          <p className="mt-5 text-sm text-muted-foreground">Weekly skin science, no fluff.</p>
          <form className="mt-4 flex border border-border rounded-full overflow-hidden focus-within:border-clinical transition">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-transparent px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 bg-primary text-primary-foreground text-xs uppercase tracking-[0.16em] font-semibold hover:bg-ink transition"
            >
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-px mx-auto max-w-[1400px] py-6 flex flex-col md:flex-row gap-3 justify-between items-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Dr Steven Acne. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-clinical">
              Privacy
            </a>
            <a href="#" className="hover:text-clinical">
              Terms
            </a>
            <a href="#" className="hover:text-clinical">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
