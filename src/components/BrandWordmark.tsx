/** One typographic treatment for the brand wherever it appears in visible UI. */
export default function BrandWordmark({ className = "" }: { className?: string }) {
  return <span className={`brand-wordmark ${className}`.trim()}>BitwellForge</span>;
}