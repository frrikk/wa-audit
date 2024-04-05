"use client";

import { createClient } from "@/utils/supabase/client";
import { cn } from "@/utils/cn";
import { useParams } from "next/navigation";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  // Fallback for environments where `window` is not available
  return process.env.NEXT_PUBLIC_BASE_URL! || "http://localhost:3000";
};

export function SignInWithAzureClient() {
  const supabase = createClient();
  const redirectTo = getBaseUrl() + "/auth/callback";

  const handleAzureLogin = async () => {
    const { data } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        scopes: "openid profile email offline_access",
        redirectTo: redirectTo,
      },
    });
  };

  return (
    <button
      className={cn(
        "max-w-[300px] w-[250px] h-[75px] items-center flex p-3 justify-center text-center rounded-md bg-slate-700 text-slate-100",
      )}
      onClick={handleAzureLogin}
    >
      Log in with Azure
    </button>
  );
}
