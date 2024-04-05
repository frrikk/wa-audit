"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export function OAuthLogin() {
  const loginWithAzure = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        scopes: "email profile openid offline_access",
      },
    });
  };

  return <button onClick={loginWithAzure}>Log in with Azure</button>;
}
