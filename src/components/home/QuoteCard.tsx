import ScrollReveal from "@/components/ScrollReveal";

interface Props {
  quote: string;
  author: string;
  role: string;
  delay?: number;
}

const QuoteCard = ({ quote, author, role, delay = 0 }: Props) => {
  return (
    <ScrollReveal delay={delay} variant="fade">
      <figure className="group h-full relative bg-card/50 backdrop-blur-sm border border-gold/15 border-l-2 border-l-gold/70 p-8 md:p-10 transition-all duration-700 hover:bg-card/70 hover:border-l-gold hover:-translate-y-1 hover:shadow-[0_18px_50px_hsl(217_50%_3%/0.5)]">
        <span aria-hidden className="absolute top-4 right-6 font-quote text-5xl text-gold/30 leading-none select-none">"</span>
        <blockquote className="font-quote text-[19px] md:text-[21px] leading-[1.55] text-foreground/90 italic mb-8 relative z-10">
          {quote}
        </blockquote>
        <figcaption className="flex items-center gap-3 mt-auto">
          <span className="h-px w-8 bg-gold/60" />
          <div className="text-[12px] tracking-wide">
            <div className="text-foreground font-medium">{author}</div>
            <div className="text-muted-foreground/80 mt-0.5">{role}</div>
          </div>
        </figcaption>
      </figure>
    </ScrollReveal>
  );
};

export default QuoteCard;
