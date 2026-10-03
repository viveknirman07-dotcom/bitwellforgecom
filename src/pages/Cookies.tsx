import { useSEO } from "@/hooks/use-seo";

export default function Cookies() {
  useSEO({ title: "Cookie Policy | BitwellForge", description: "Understand essential browser storage and optional cookie choices on BitwellForge.", canonicalPath: "/cookies" });
  return <article className="pt-32 pb-24 px-5 md:px-10 max-w-[900px] mx-auto text-foreground">
    <h1 className="font-heading text-[42px] md:text-[68px] leading-tight">Cookie Policy</h1>
    <div className="mt-10 space-y-9 text-[15px] md:text-[17px] leading-[1.8] text-muted-foreground">
      <section><h2 className="font-heading text-[29px] text-foreground mb-3">Necessary</h2><p>Essential storage supports account sessions, checkout continuity, security checks, and remembering your consent choice. It cannot be turned off through our preferences because these functions are needed for the site to work.</p></section>
      <section><h2 className="font-heading text-[29px] text-foreground mb-3">Analytics</h2><p>Analytics can help us understand how the site is used. No optional analytics scripts are currently installed on this site. If introduced, they will require your consent before loading.</p></section>
      <section><h2 className="font-heading text-[29px] text-foreground mb-3">Marketing</h2><p>Marketing storage may be used to measure campaigns. No optional marketing scripts are currently installed on this site. If introduced, they will require your consent before loading.</p></section>
      <section><h2 className="font-heading text-[29px] text-foreground mb-3">Change your choice</h2><p>Use Cookie settings in the footer to review or change your optional preferences at any time. You can also manage stored data in your browser settings. Questions can be sent to <a href="mailto:support@bitwellforge.com" className="text-foreground underline">support@bitwellforge.com</a>.</p></section>
    </div>
  </article>;
}