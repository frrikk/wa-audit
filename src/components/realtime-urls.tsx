"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const RealtimeUrls = ({ urls }: { urls: any }) => {
  const supabase = createClient();
  const router = useRouter();
  useEffect(() => {
    const channel = supabase
      .channel("realtime urls")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "web",
        },
        (payload) => {
          router.refresh();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, supabase]);
  return urls.map((row: any) => <li key={row.id}>{row.url}</li>);
};
