import { cn } from "@/utils/cn";
import { redirect } from "next/navigation";
import { SignInWithAzure } from "@/components/ui/login-with-azure";
import { createClient } from "@/utils/supabase/server";

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
      {/*<Form />*/}
      <SignInWithAzure />
      {/*<OAuthLogin />*/}
    </div>
  );
}
