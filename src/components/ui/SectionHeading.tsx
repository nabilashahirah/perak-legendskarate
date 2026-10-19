import { Reveal } from "./Reveal";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
  className?: string;
};

/** Gold "01 — ABOUT" eyebrow + large display heading */
export function SectionHeading({ index, eyebrow, title, intro, id, className = "" }: Props) {
  return (
    <Reveal className={className}>
      <p className="eyebrow flex items-center gap-3">
        <span className="text-gold-gradient font-display text-xl tracking-[0.08em]">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
        <span>{eyebrow}</span>
      </p>
      <h2 id={id} className="display h-display-lg mt-5 max-w-[16ch] text-cream">
        {title}
      </h2>
      {intro && <p className="mt-5 max-w-xl text-muted">{intro}</p>}
    </Reveal>
  );
}
