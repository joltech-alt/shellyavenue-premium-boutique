import { cn } from "@/lib/utils";

export function Isotype({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="Isotipo SHELLY AVENUE"
      className={cn("h-8 w-8", className)}
    >
      <rect x="1" y="1" width="46" height="46" rx="14" fill="currentColor" opacity="0.08" />
      <path
        d="M15 16.5c0-3.6 2.9-6.5 6.5-6.5h5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M32.5 16.5C32.5 12.9 29.6 10 26 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M12.6 16.5h22.8l2.1 18.6A3.6 3.6 0 0 1 33.9 39H14.1a3.6 3.6 0 0 1-3.6-3.9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M28.2 22.6c-1.5-1.4-6.3-1.9-7.4.6-1 2.3 1.7 3.2 3.6 3.7 1.9.5 4.2 1.5 3.4 3.8-.9 2.5-5.7 2.4-7.5.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span className="font-display text-lg font-semibold tracking-[0.28em] sm:text-xl">
        SHELLY
      </span>
      <span className="eyebrow mt-0.5 text-[0.6rem] text-muted-foreground sm:text-[0.65rem]">
        AVENUE
      </span>
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2 text-foreground", className)}>
      <Isotype className="h-9 w-9 shrink-0 text-primary" />
      <Wordmark />
    </span>
  );
}
