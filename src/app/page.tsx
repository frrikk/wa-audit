import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { RealtimeUrls } from "@/components/realtime-urls";
import { Input } from "@/components/input";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: web } = await supabase.from("web").select();

  if (!web) return null;

  return (
    <div>
      <RealtimeUrls urls={web} />
      <Input />
    </div>
  );
}
