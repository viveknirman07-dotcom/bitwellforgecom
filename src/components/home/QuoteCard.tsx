import ScrollReveal from "@/components/ScrollReveal";

interface Props {
  quote: string;
  author: string;
  role: string;
  delay?: number;
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const QuoteCard = ({ quote, author, role, delay = 0 }: Props) => {
  return (
    <ScrollReveal delay={delay} variant="fade">
      <figure className="glass-panel group flex h-full flex-col p-8 md:p-10">
        <blockquote className="mb-10 text-[17px] font-light leading-[1.7] text-foreground/90 md:text-[18px]">
          {quote}
        </blockquote>
        <figcaption className="mt-auto flex items-center gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 text-[11px] tracking-[0.14em] text-foreground/70 transition-shadow duration-500 group-hover:shadow-[var(--glow-accent-strong)]">
            {initials(author)}
          </span>
          <span className="text-[12px] tracking-wide">
            <span className="block font-medium text-foreground">{author}</span>
            <span className="mt-0.5 block text-muted-foreground/80">{role}</span>
          </span>
        </figcaption>
      </figure>
    </ScrollReveal>
  );
};

export default QuoteCard;
