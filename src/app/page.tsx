import { createClient } from "@/utils/supabase/client";
import { getLighthouseData } from "@/utils/get-lighthouse-data";

export default async function Page() {
  const supabase = createClient();
  const { data: web } = await supabase.from("web").select();

  if (!web) return null;

  return <div>{JSON.stringify(web, null, 2)}</div>;
}
