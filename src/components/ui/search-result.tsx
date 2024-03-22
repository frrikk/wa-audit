import { PageCard } from "@/components/page-card";
import { SupabaseData } from "@/utils/types";
import { createClient } from "@/utils/supabase/client";

interface SearchResultProps {
  query: string | undefined;
}

export async function SearchResult({ query }: SearchResultProps) {
  const supabase = createClient();
  const { data } = await supabase.from("web").select();
  if (!data) return null;

  const sortedData = data
    .map((item) => ({
      ...item,
      score:
        item.accessibility_score +
        item.performance_score +
        item.best_practices_score +
        item.seo_score,
    }))
    .sort((a, b) => b.score - a.score);

  const filteredData = sortedData.filter((item: SupabaseData) => {
    const queryLowercased = query?.toLowerCase() || "";

    const nameMatches = item.name.toLowerCase().includes(queryLowercased);

    const segmentMatches =
      item.segment?.toLowerCase().includes(queryLowercased) ?? false;

    return nameMatches || segmentMatches;
  });

  return (
    <>
      {filteredData.map((item) => {
        const scoreAvarage = Math.round(item.score / 4);

        return (
          <PageCard
            {...item}
            key={item.id}
            query={query}
            avarageScore={scoreAvarage}
          />
        );
      })}
    </>
  );
}
