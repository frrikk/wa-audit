"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { FormType } from "@/components/ui/form";

export async function login(formData: FormType) {
  const supabase = createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logOut() {
  const supabase = createClient();
  await supabase.auth.signOut();

  redirect("/login");
}

export async function loginWithAzure() {
  const supabase = createClient();

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "azure",
    options: {
      scopes: "email User.Read openid profile offline_access",
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL!}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
}
