"use client";

import { createClient } from "@/utils/supabase/client";

export function SignInWithAzureClient() {
  const supabase = createClient();

  const handleAzureLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        scopes: "openid profile email offline_access",
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return <button onClick={handleAzureLogin}>Log in with Azure</button>;
}
