import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex flex-col items-start leading-none ${className}`}>
      <span className="text-[1.05rem] md:text-[1.15rem] font-semibold tracking-[0.06em] text-primary">
        DR. STEVEN
      </span>
      <span className="mt-1 flex items-center gap-2 text-[0.6rem] md:text-[0.65rem] font-semibold tracking-[0.32em] text-clinical">
        <span className="h-px w-4 bg-clinical/70" />
        ACNE
        <span className="h-px w-4 bg-clinical/70" />
      </span>
    </Link>
  );
}
