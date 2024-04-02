import { cn } from "@/utils/cn";
import { Form } from "@/components/ui/form";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/");
  }

  return (
    <div className={cn("flex h-dvh flex-col items-center mt-10")}>
      <Form />
    </div>
  );
}
