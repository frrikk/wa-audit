import { cn } from "@/utils/cn";
import { redirect, useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { SignInWithAzureClient } from "@/components/ui/sign-in-with-azure-client";

export default async function LoginPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className={cn("flex h-dvh flex-col items-center mt-10")}>
      <SignInWithAzureClient />
    </div>
  );
}
