import { SearchResult } from "@/components/ui/search-result";
import { Search } from "@/components/ui/search";
import { Suspense } from "react";
import { MainColumn } from "@/components/layout/main-column";
import { GridList } from "@/components/layout/grid-list";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const revalidate = 60;

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const query = searchParams?.query?.trim() || "";

  // if (!user) {
  //   redirect("/login");
  // }

  const iconName = user?.email?.at(0);

  return (
    <MainColumn
      email={user?.email ?? ""}
      nameIcon={iconName ?? ""}
      pageHeading="WebPerf Audit for Tietoevry Norway related websites"
      subHeading
    >
      <Search />
      <GridList>
        <Suspense fallback={<Skeleton />}>
          <SearchResult query={query} />
        </Suspense>
      </GridList>
    </MainColumn>
  );
}
