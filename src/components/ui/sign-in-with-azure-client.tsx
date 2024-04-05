"use client";

import { createClient } from "@/utils/supabase/client";
import { cn } from "@/utils/cn";

export function SignInWithAzureClient() {
  const supabase = createClient();

  const handleAzureLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        scopes: "openid profile email offline_access",
        redirectTo: `/auth/callback`,
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
