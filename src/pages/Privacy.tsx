import { useSEO } from "@/hooks/use-seo";

export default function Privacy() {
  useSEO({ title: "Privacy Policy | BitwellForge", description: "How BitwellForge handles information you share when browsing, contacting us, applying, or purchasing.", canonicalPath: "/privacy" });
  return <article className="pt-32 pb-24 px-5 md:px-10 max-w-[900px] mx-auto text-foreground">
    <h1 className="font-heading text-[42px] md:text-[68px] leading-tight">Privacy Policy</h1>
    <div className="mt-10 space-y-9 text-[15px] md:text-[17px] leading-[1.8] text-muted-foreground">
      <section><h2 className="font-heading text-[29px] text-foreground mb-3">Information you share</h2><p>When you contact us, apply for a role, create an account, or buy a product, we use the information you provide to respond, review your application, manage access, process your order, and provide support. Payment details are handled by the payment provider you choose rather than entered into a BitwellForge card form.</p></section>
      <section><h2 className="font-heading text-[29px] text-foreground mb-3">Site operation</h2><p>Essential browser storage helps preserve sign in, checkout, security, and your privacy choices. Optional analytics and marketing storage are disabled unless you consent. You can change your choice at any time using Cookie settings in the footer. See our <a href="/cookies" className="text-foreground underline">Cookie Policy</a>.</p></section>
      <section><h2 className="font-heading text-[29px] text-foreground mb-3">Service providers</h2><p>We use hosting, account, payment, and email delivery providers to run the site and fulfill purchases. We share the information needed for those services. Please avoid sending sensitive personal information in general enquiries.</p></section>
      <section><h2 className="font-heading text-[29px] text-foreground mb-3">Your choices</h2><p>For questions about access, correction, or deletion of information you have shared, contact <a href="mailto:support@bitwellforge.com" className="text-foreground underline">support@bitwellforge.com</a>. For commercial enquiries, contact <a href="mailto:business@bitwellforge.com" className="text-foreground underline">business@bitwellforge.com</a>.</p></section>
    </div>
  </article>;
}