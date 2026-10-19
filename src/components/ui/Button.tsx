import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg" | "sm";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-[4px] font-semibold uppercase tracking-[0.14em] transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out active:translate-y-px select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-yellow text-ink-950 hover:bg-yellow-hover shadow-[0_0_0_0_rgba(255,199,44,0)] hover:shadow-[0_8px_30px_-8px_rgba(255,199,44,0.55)]",
  outline:
    "border border-gold/70 text-gold-light hover:border-gold-light hover:bg-gold/10 hover:text-cream",
  ghost: "text-cream hover:text-gold-light",
};

const sizes: Record<Size, string> = {
  sm: "min-h-11 px-4 text-[0.7rem]",
  md: "min-h-12 px-6 text-[0.75rem]",
  lg: "min-h-14 px-8 text-[0.8rem]",
};

type Props = {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"a">, "href">;

export function ButtonLink({ href, variant = "primary", size = "md", external, className = "", children, ...rest }: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
