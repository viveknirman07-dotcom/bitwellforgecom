/**
 * Mini 24x24 icons used inside CaseStudyCard headers.
 * Token-driven (--svg-stroke / --svg-glow), breathing 24/7.
 */

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 overflow-visible" aria-hidden>
    {children}
  </svg>
);

const PipelineIcon = () => (
  <Wrap>
    <line x1="3" y1="12" x2="21" y2="12" stroke="hsl(var(--svg-stroke))" strokeWidth="1" strokeDasharray="240" className="anim-line-draw" />
    <circle cx="3"  cy="12" r="1.5" fill="hsl(var(--svg-stroke))" />
    <circle cx="21" cy="12" r="1.5" fill="hsl(var(--svg-stroke))" />
    <circle cx="12" cy="12" r="2.4" fill="hsl(var(--svg-highlight))" className="anim-node-pulse anim-glow-pulse" />
  </Wrap>
);

const FunnelIcon = () => (
  <Wrap>
    <rect x="4"  y="5"  width="16" height="3" fill="hsl(var(--svg-stroke))" />
    <rect x="6"  y="10" width="12" height="3" fill="hsl(var(--svg-stroke))" />
    <rect x="9"  y="15" width="6"  height="3" fill="hsl(var(--svg-highlight))" className="anim-glow-pulse" />
  </Wrap>
);

const CompassIcon = () => (
  <Wrap>
    <circle cx="12" cy="12" r="9" fill="none" stroke="hsl(var(--svg-stroke))" strokeWidth="1" />
    <polygon points="12,5 14,12 12,19 10,12" fill="hsl(var(--svg-highlight))"
      className="anim-rotate-slow anim-glow-pulse" style={{ transformOrigin: "12px 12px" }} />
  </Wrap>
);

const GearMiniIcon = () => {
  const teeth = Array.from({ length: 6 }, (_, i) => i * 60);
  return (
    <Wrap>
      <g className="anim-rotate-12" style={{ transformOrigin: "12px 12px" }}>
        {teeth.map((d) => (
          <rect key={d} x="11" y="2" width="2" height="3" fill="hsl(var(--svg-stroke))" transform={`rotate(${d} 12 12)`} />
        ))}
        <circle cx="12" cy="12" r="6" fill="none" stroke="hsl(var(--svg-stroke))" strokeWidth="1.1" />
        <circle cx="12" cy="12" r="2" fill="hsl(var(--svg-highlight))" className="anim-glow-pulse" />
      </g>
    </Wrap>
  );
};

const ArrowUpIcon = () => (
  <Wrap>
    <line x1="12" y1="20" x2="12" y2="5" stroke="hsl(var(--svg-stroke))" strokeWidth="1.4" />
    <polyline points="6,11 12,5 18,11" fill="none" stroke="hsl(var(--svg-stroke))" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="5" r="2" fill="hsl(var(--svg-highlight))" className="anim-node-pulse anim-glow-pulse" />
  </Wrap>
);

const MatrixIcon = () => (
  <Wrap>
    <line x1="12" y1="3"  x2="12" y2="21" stroke="hsl(var(--svg-stroke))" strokeWidth="0.8" strokeDasharray="2 2" />
    <line x1="3"  y1="12" x2="21" y2="12" stroke="hsl(var(--svg-stroke))" strokeWidth="0.8" strokeDasharray="2 2" />
    {[[6, 16], [9, 18], [7, 14]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="1" fill="hsl(var(--svg-secondary))" />
    ))}
    <circle cx="17" cy="7" r="2.4" fill="hsl(var(--svg-highlight))" className="anim-glow-pulse" />
  </Wrap>
);

const map: Record<string, () => JSX.Element> = {
  "B2B Lead Generation": PipelineIcon,
  "Lead Generation":     PipelineIcon,
  "Revenue Systems":     FunnelIcon,
  "Revenue":             FunnelIcon,
  "Growth Strategy":     CompassIcon,
  "Strategy":            CompassIcon,
  "AI Automation":       GearMiniIcon,
  "Automation":          GearMiniIcon,
  "Sales Systems":       ArrowUpIcon,
  "Sales":               ArrowUpIcon,
  "Positioning":         MatrixIcon,
};

export const CategoryIcon = ({ category }: { category: string }) => {
  const Icon = map[category] ?? PipelineIcon;
  return <Icon />;
};
