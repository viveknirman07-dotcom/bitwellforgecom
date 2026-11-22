import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Process from "./pages/Process";
import Audit from "./pages/Audit";
import AuditThankYou from "./pages/audit/ThankYou";
import AuditIntake from "./pages/audit/Intake";
import AuditOnboardingConfirmed from "./pages/audit/OnboardingConfirmed";
import AuditClientStatus from "./pages/audit/ClientStatus";
import AuditFindingsPresentation from "./pages/audit/FindingsPresentation";
import AuditAuditAdmin from "./pages/audit/AuditAdmin";

import Insights from "./pages/Insights";
import InsightArticle from "./pages/InsightArticle";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ServiceDetail from "./pages/ServiceDetail";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyArticle from "./pages/CaseStudyArticle";
import Careers from "./pages/Careers";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Diagnosis from "./pages/Diagnosis";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "@/hooks/use-auth";
import VisualLoading from "@/components/VisualLoading";
import OpeningGate from "@/components/opening/OpeningGate";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <VisualLoading />
            <OpeningGate />
            <ScrollToTop />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/case-studies/:id" element={<CaseStudyArticle />} />
                <Route path="/process" element={<Process />} />
                <Route path="/audit" element={<Audit />} />
                <Route path="/audit/thank-you" element={<AuditThankYou />} />
                <Route path="/audit/intake" element={<AuditIntake />} />
                <Route path="/audit/onboarding-confirmed" element={<AuditOnboardingConfirmed />} />
                <Route path="/audit/client" element={<AuditClientStatus />} />
                <Route path="/audit/findings-presentation" element={<AuditFindingsPresentation />} />
                <Route path="/audit/admin" element={<AuditAuditAdmin />} />

                <Route path="/insights" element={<Insights />} />
                <Route path="/insights/:slug" element={<InsightArticle />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/diagnosis" element={<Diagnosis />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
