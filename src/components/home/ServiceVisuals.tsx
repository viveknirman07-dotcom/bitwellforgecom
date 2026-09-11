import { Diagram, Caption, Label, Node, Link, Flow, FIELD, STROKE, TYPE } from "@/components/diagrams/kit";

/**
 * Homepage capability diagrams.
 * Same geometry, type scale and stroke scale as every other diagram on the site.
 */

/* ─────────── Demand architecture: scattered channels resolving into one pipeline */
export const DemandGraph = () => {
  const hub = { x: 132, y: 84 };
  const sources = [
    { x: 40, y: 42, l: "LINKEDIN" },
    { x: 40, y: 72, l: "EMAIL" },
    { x: 40, y: 102, l: "CONTENT" },
    { x: 40, y: 132, l: "TRIGGERS" },
  ];
  const outs = [58, 84, 110];

  return (
    <Diagram>
      <Caption>DEMAND ARCHITECTURE</Caption>

      {sources.map((s, i) => (
        <g key={s.l}>
          <Label x={s.x - 6} y={s.y + 1.4} anchor="end" size={TYPE.micro} opacity={0.55}>
            {s.l}
          </Label>
          <circle cx={s.x} cy={s.y} r="1.8" fill="currentColor" opacity="0.8" />
          <Link d={`M ${s.x} ${s.y} L ${hub.x - 18} ${hub.y}`} />
          <Flow path={`M ${s.x} ${s.y} L ${hub.x - 18} ${hub.y}`} dur={5.5} begin={i * 0.7} />
        </g>
      ))}

      {/* qualification core */}
      <rect
        x={hub.x - 18}
        y={hub.y - 18}
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE.base}
        opacity="0.7"
      />
      <rect
        x={hub.x - 11}
        y={hub.y - 11}
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE.thin}
        opacity="0.45"
      />
      <Label x={hub.x} y={hub.y + 1.4} size={TYPE.label} opacity={0.7}>
        PIPELINE
      </Label>
      <circle cx={hub.x} cy={hub.y + 9} r="1.5" fill="currentColor">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2.6s" repeatCount="indefinite" />
      </circle>

      {/* qualified output */}
      {outs.map((y, i) => (
        <g key={y}>
          <Link d={`M ${hub.x + 18} ${hub.y} L ${FIELD.x2 - 8} ${y}`} opacity={0.5} />
          <Node x={FIELD.x2 - 8} y={y} r={4} />
          <Flow path={`M ${hub.x + 18} ${hub.y} L ${FIELD.x2 - 8} ${y}`} dur={4} begin={1 + i * 1.2} />
        </g>
      ))}
      <Label x={FIELD.x2} y={FIELD.y1 + 14} anchor="end" size={TYPE.micro} opacity={0.5}>
        QUALIFIED
      </Label>
    </Diagram>
  );
};

/* ─────────── Revenue funnel: stage widths, conversion read-out */
export const RevenueFunnel = () => {
  const stages = [
    { l: "AWARENESS", pct: 100 },
    { l: "ENGAGED", pct: 62 },
    { l: "QUALIFIED", pct: 34 },
    { l: "PROPOSAL", pct: 18 },
    { l: "CLOSED", pct: 9 },
  ];
  const maxW = 150;
  const top = 36;
  const gap = 22;

  return (
    <Diagram>
      <Caption>CONVERSION ECONOMICS</Caption>

      {stages.map((s, i) => {
        const w = Math.max(12, (s.pct / 100) * maxW);
        const y = top + i * gap;
        const x = FIELD.x1 + 44;
        return (
          <g key={s.l}>
            <Label x={x - 6} y={y + 6} anchor="end" size={TYPE.micro} opacity={0.6}>
              {s.l}
            </Label>
            <rect x={x} y={y} width={maxW} height="9" fill="none" stroke="currentColor" strokeWidth="0.2" opacity="0.25" />
            <rect x={x} y={y} width={w} height="9" fill="currentColor" opacity={0.14 + i * 0.03} />
            <rect x={x} y={y} width={w} height="9" fill="none" stroke="currentColor" strokeWidth={STROKE.thin} opacity="0.7" />
            <Label x={x + maxW + 8} y={y + 6.4} anchor="start" size={TYPE.micro} opacity={0.55}>
              {`${s.pct}%`}
            </Label>
            {i < stages.length - 1 && (
              <Link d={`M ${x + 4} ${y + 9} L ${x + 4} ${y + gap}`} opacity={0.35} dashed />
            )}
          </g>
        );
      })}

      <Flow path={`M ${FIELD.x1 + 48} ${top + 4.5} L ${FIELD.x1 + 48} ${top + 4 * gap + 4.5}`} dur={6} r={1.5} />
    </Diagram>
  );
};

/* ─────────── Positioning: price / differentiation field */
export const PositioningMatrix = () => {
  const x0 = FIELD.x1 + 26;
  const x1 = FIELD.x2 - 6;
  const y0 = FIELD.y1 + 10;
  const y1 = FIELD.y2 - 14;
  const midX = (x0 + x1) / 2;
  const midY = (y0 + y1) / 2;
  const you = { x: x1 - 30, y: y0 + 20 };

  return (
    <Diagram>
      <Caption>POSITIONING FIELD</Caption>

      <Link d={`M ${x0} ${y0} L ${x0} ${y1}`} opacity={0.55} width={STROKE.thin} />
      <Link d={`M ${x0} ${y1} L ${x1} ${y1}`} opacity={0.55} width={STROKE.thin} />
      <Link d={`M ${midX} ${y0} L ${midX} ${y1}`} opacity={0.3} dashed />
      <Link d={`M ${x0} ${midY} L ${x1} ${midY}`} opacity={0.3} dashed />

      <Label x={x0 - 4} y={y0 + 2} anchor="end" size={TYPE.micro} opacity={0.5}>
        HIGH
      </Label>
      <Label x={x0 - 4} y={y1} anchor="end" size={TYPE.micro} opacity={0.5}>
        LOW
      </Label>
      <Label x={x0} y={y1 + 10} anchor="start" size={TYPE.micro} opacity={0.5}>
        LOW PRICE
      </Label>
      <Label x={x1} y={y1 + 10} anchor="end" size={TYPE.micro} opacity={0.5}>
        HIGH PRICE
      </Label>
      <Label x={x0 - 4} y={midY - 6} anchor="end" size={TYPE.micro} opacity={0.5}>
        DIFF
      </Label>

      {/* undifferentiated cluster */}
      {[
        [58, 118], [76, 106], [92, 124], [66, 96], [104, 114], [84, 118], [52, 128],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.7" fill="currentColor" opacity="0.35">
          <animate attributeName="opacity" values="0.2;0.45;0.2" dur="4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* the engineered position */}
      <circle cx={you.x} cy={you.y} r="9" fill="none" stroke="currentColor" strokeWidth={STROKE.thin} opacity="0.6">
        <animate attributeName="r" values="9;13;9" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="3.2s" repeatCount="indefinite" />
      </circle>
      <Node x={you.x} y={you.y} r={5} />
      <Label x={you.x + 10} y={you.y + 1.4} anchor="start" size={TYPE.micro} opacity={0.7}>
        YOUR POSITION
      </Label>
      <Link d={`M ${you.x - 5} ${you.y + 5} L 104 114`} opacity={0.3} dashed />
    </Diagram>
  );
};

/* ─────────── Automation: inputs → routing → running workflows */
export const AutomationFlow = () => {
  const inputs = [46, 68, 90, 112];
  const router = { x: 108, y: 82 };
  const flows = [
    { y: 46, l: "NURTURE" },
    { y: 74, l: "QUALIFY" },
    { y: 102, l: "ROUTE" },
    { y: 130, l: "REPORT" },
  ];

  return (
    <Diagram>
      <Caption>OPERATIONAL LEVERAGE</Caption>

      <Label x={FIELD.x1} y={FIELD.y1 + 12} anchor="start" size={TYPE.micro} opacity={0.5}>
        INPUTS
      </Label>
      {inputs.map((y, i) => (
        <g key={y}>
          <rect
            x={FIELD.x1}
            y={y - 2.5}
            width="13"
            height="5"
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE.thin}
            opacity="0.65"
          />
          <Link d={`M ${FIELD.x1 + 13} ${y} L ${router.x - 16} ${router.y}`} />
          <Flow path={`M ${FIELD.x1 + 13} ${y} L ${router.x - 16} ${router.y}`} dur={5} begin={i * 0.6} r={1.2} />
        </g>
      ))}

      <polygon
        points={`${router.x},${router.y - 16} ${router.x + 16},${router.y} ${router.x},${router.y + 16} ${router.x - 16},${router.y}`}
        fill="hsl(var(--background))"
        stroke="currentColor"
        strokeWidth={STROKE.base}
        opacity="0.8"
      />
      <Label x={router.x} y={router.y + 1.4} size={TYPE.micro} opacity={0.75}>
        ROUTE
      </Label>

      {flows.map((f, i) => (
        <g key={f.l}>
          <Link d={`M ${router.x + 16} ${router.y} L 156 ${f.y}`} opacity={0.45} />
          <rect
            x="156"
            y={f.y - 6}
            width={FIELD.x2 - 156}
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE.thin}
            opacity="0.7"
          />
          <Label x="160" y={f.y + 1.4} anchor="start" size={TYPE.micro} opacity={0.6}>
            {f.l}
          </Label>
          <rect x={FIELD.x2 - 22} y={f.y - 1} width="16" height="2" fill="currentColor" opacity="0.2" />
          <rect x={FIELD.x2 - 22} y={f.y - 1} width="0" height="2" fill="currentColor" opacity="0.8">
            <animate
              attributeName="width"
              values="0;16;16;0"
              keyTimes="0;0.4;0.85;1"
              dur="6s"
              begin={`${i * 1.2}s`}
              repeatCount="indefinite"
            />
          </rect>
          <Flow path={`M ${router.x + 16} ${router.y} L 156 ${f.y}`} dur={4} begin={1.5 + i} />
        </g>
      ))}
    </Diagram>
  );
};
