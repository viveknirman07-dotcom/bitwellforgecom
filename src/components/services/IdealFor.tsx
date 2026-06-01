import ScrollReveal from "@/components/ScrollReveal";

interface Props {
  items: string[];
}

const IdealFor = ({ items }: Props) => (
  <ScrollReveal>
    <div className="mb-14">
      <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">Ideal For</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[hsl(var(--foreground)/0.10)] border border-[hsl(var(--foreground)/0.10)] rounded-xl overflow-hidden">
        {items.map((item, i) => (
          <li
            key={item}
            className="bg-background/60 px-5 py-4 flex items-center gap-3 text-foreground/85 text-[14.5px]"
          >
            <span className="text-[10px] text-[hsl(var(--eyebrow-color))] tabular-nums tracking-[0.2em]">
              {String(i + 1).padStart(2, "0")}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  </ScrollReveal>
);

export default IdealFor;
