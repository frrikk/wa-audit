import { SearchResult } from "@/components/ui/search-result";
import { Search } from "@/components/ui/search";
import { Suspense } from "react";
import { MainColumn } from "@/components/layout/main-column";
import { GridList } from "@/components/layout/grid-list";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query?.trim() || "";

  return (
    <MainColumn
      pageHeading="WebPerf Audit for Tietoevry Norway related websites"
      subHeading
    >
      <Search />
      <GridList>
        <Suspense>
          <SearchResult query={query} />
        </Suspense>
      </GridList>
    </MainColumn>
  );
}
