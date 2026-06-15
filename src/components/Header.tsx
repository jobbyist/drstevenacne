import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { CartDrawer } from "./CartDrawer";
import { Sparkles, Search } from "lucide-react";

const NAV = [
  { label: "Shop", href: "#shop" },
  { label: "The Regimen", href: "#regimen" },
  { label: "Science", href: "#science" },
  { label: "Journal", href: "#journal" },
];

export function Header({ onOpenAI }: { onOpenAI: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="relative bg-primary text-primary-foreground text-[11px] tracking-[0.18em] uppercase text-center py-2 font-medium">
        <span className="hidden sm:inline">
          Free delivery on orders over R750 · 60-day skin happiness guarantee
        </span>
        <span className="sm:hidden">Free delivery over R750</span>
      </div>
      <header
        className={`sticky top-0 z-40 backdrop-blur transition-colors ${
          scrolled ? "bg-background/95 border-b border-border" : "bg-background/80"
        }`}
      >
        <div className="container-px mx-auto max-w-[1400px] flex items-center justify-between h-16 md:h-20">
          <Logo />
          <nav className="hidden lg:flex items-center gap-9">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="text-[13px] font-medium tracking-wide text-primary/85 hover:text-clinical transition relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:scale-x-0 after:bg-clinical after:transition-transform hover:after:scale-x-100 after:origin-left"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <button
              onClick={onOpenAI}
              className="hidden md:inline-flex items-center gap-2 h-10 px-4 rounded-full bg-clinical/10 text-clinical hover:bg-clinical hover:text-clinical-foreground text-[12px] font-semibold tracking-[0.16em] uppercase transition"
            >
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} /> Steven AI
            </button>
            <button
              aria-label="Search"
              className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full text-primary hover:bg-mist"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </button>
            <CartDrawer />
          </div>
        </div>
      </header>
    </>
  );
}
