import { useEffect, useState } from "react";
import { Globe, Check } from "lucide-react";

const LANGS = [
  { code: "en", label: "English" },
  { code: "af", label: "Afrikaans" },
  { code: "zu", label: "isiZulu" },
  { code: "xh", label: "isiXhosa" },
];

export function LanguageSwitch() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("dsa-lang") : null;
    if (stored) setLang(stored);
  }, []);

  useEffect(() => {
    const onDoc = () => setOpen(false);
    if (open) {
      window.addEventListener("click", onDoc);
      return () => window.removeEventListener("click", onDoc);
    }
  }, [open]);

  const choose = (code: string) => {
    setLang(code);
    localStorage.setItem("dsa-lang", code);
    setOpen(false);
  };

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        className="h-10 px-2.5 inline-flex items-center gap-1.5 rounded-full text-primary hover:bg-mist transition"
      >
        <Globe className="h-[18px] w-[18px]" strokeWidth={1.6} />
        <span className="text-[12px] font-semibold uppercase tracking-wider">{current.code}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl border border-border bg-background shadow-product py-1.5 z-50 animate-fade-in">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => choose(l.code)}
              className="w-full flex items-center justify-between px-4 py-2 text-sm text-primary hover:bg-mist transition"
            >
              <span>{l.label}</span>
              {l.code === lang && <Check className="h-3.5 w-3.5 text-clinical" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
