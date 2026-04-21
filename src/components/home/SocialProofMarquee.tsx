const items = [
  "Consulting Firms",
  "Digital Agencies",
  "Solo Operators",
  "SaaS Founders",
  "B2B Service Businesses",
];

const SocialProofMarquee = () => {
  return (
    <section className="relative border-y border-gold/15 bg-background/60 backdrop-blur-sm overflow-hidden">
      <div className="section-padding max-w-[1400px] mx-auto py-8 md:py-10">
        <p className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-muted-foreground/70 text-center mb-5">
          Trusted by founders and operators across
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex gap-16 animate-[marquee_36s_linear_infinite] whitespace-nowrap will-change-transform">
            {[...items, ...items, ...items].map((label, i) => (
              <span
                key={i}
                className="font-heading text-lg md:text-xl text-foreground/35 tracking-wide"
              >
                {label}
                <span className="ml-16 text-gold/30">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-33.3333%,0,0); }
        }
      `}</style>
    </section>
  );
};

export default SocialProofMarquee;
