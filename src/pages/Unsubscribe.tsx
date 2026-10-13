import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type State = "loading" | "valid" | "used" | "invalid" | "done" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    if (!token) { setState("invalid"); return; }
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`;
    fetch(url, { headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } })
      .then((r) => r.json())
      .then((d) => setState(d.valid ? "valid" : d.reason === "already_unsubscribed" ? "used" : "invalid"))
      .catch(() => setState("error"));
  }, [token]);

  const confirm = async () => {
    const { error } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
    setState(error ? "error" : "done");
  };

  const copy: Record<State, string> = {
    loading: "Checking your link.",
    valid: "Confirm that you no longer wish to receive emails from BitwellForge.",
    used: "This address has already been unsubscribed.",
    invalid: "This link is invalid or has expired.",
    done: "You have been unsubscribed.",
    error: "Something went wrong. Please try again later.",
  };

  return (
    <section className="section-padding pt-40 pb-32">
      <div className="max-w-[640px] mx-auto">
        <h1 className="font-heading text-foreground text-[clamp(34px,5vw,56px)] leading-[1.05]">Email preferences</h1>
        <p className="mt-6 font-body text-muted-foreground text-[16px] leading-[1.8]">{copy[state]}</p>
        {state === "valid" && (
          <button onClick={confirm} className="mt-10 min-h-[48px] px-8 bg-foreground text-background font-body text-[13px] tracking-[0.12em]">
            Confirm unsubscribe
          </button>
        )}
      </div>
    </section>
  );
};

export default Unsubscribe;
