import { cn } from "@/utils/cn";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { DataTable } from "@/components/table";
import { IconBulb } from "@tabler/icons-react";

interface Data {
  url: string;
  accessibility_score: number;
  performance_score: number;
  best_practices_score: number;
  seo_score: number;
}

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.from("web").select();

  const webData: Data[] = data as Data[];

  if (!webData) return null;

  return (
    <main className="bg-white min-h-screen max-w-[1200px] p-8 mx-auto border-x border-x-slate-200">
      <h1 className={cn("font-light text-3xl antialiased ")}>
        Web Performance for Tietoevry Norway related websites
      </h1>
      <p className={cn("font-light text-sm mt-2 mb-8")}>
        Test done with{" "}
        <Link
          className={cn("underline underline-offset-4 text-blue-900")}
          href="https://developer.chrome.com/docs/lighthouse/performance/performance-scoring"
        >
          Lighthouse
        </Link>
      </p>
      <ul className={cn("flex flex-col")}>
        {webData.map((site, index) => {
          const scoreSum =
            site.accessibility_score +
            site.performance_score +
            site.best_practices_score +
            site.seo_score;

          const scoreAvarge = avargeScore(scoreSum) / 4;

          const scoreColor = (score: number) => {
            if (score < 50) {
              return "py-1 px-2 flex gap-1 items-center rounded-sm bg-red-200 [span]:text-slate-50";
            } else if (score < 90 && score >= 50) {
              return "py-1 px-2 flex gap-1 items-center rounded-sm bg-yellow-200";
            } else {
              return "py-1 px-2 flex gap-1 items-center rounded-sm bg-green-200";
            }
          };

          return (
            <li
              key={`${index}-${site.url}`}
              className={cn("flex flex-col border-b p-4")}
            >
              <div className={cn("flex gap-4 items-center")}>
                <p className={cn("font-semibold text-slate-800")}>
                  {index + 1}.
                </p>
                <h2>
                  <Link
                    className={cn(
                      "text-slate-800 underline underline-offset-4",
                    )}
                    href={site.url}
                  >
                    {site.url}
                  </Link>
                </h2>
                <div
                  className={cn("p-2 text-sm font-semibold rounded-md", {
                    "bg-red-200": scoreAvarge < 50,
                    "bg-yellow-200": scoreAvarge < 90 && scoreAvarge >= 50,
                    "bg-green-200": scoreAvarge >= 90,
                  })}
                >
                  {Math.round(scoreAvarge)}
                </div>
              </div>
              <div
                className={cn(
                  "flex justify-between flex-col lg:flex-row gap-3 items-baseline",
                )}
              >
                <div
                  className={cn(
                    "flex gap-2 p-2 text-xs [&_span]:text-slate-700 flex-wrap",
                  )}
                >
                  <p className={scoreColor(site.accessibility_score)}>
                    LH Accessibility <span>{site.accessibility_score}</span>
                  </p>
                  <p className={scoreColor(site.performance_score)}>
                    LH Performance <span>{site.performance_score}</span>
                  </p>
                  <p className={scoreColor(site.best_practices_score)}>
                    LH Best Practices <span>{site.best_practices_score}</span>
                  </p>
                  <p className={scoreColor(site.seo_score)}>
                    LH SEO <span>{site.seo_score}</span>
                  </p>
                </div>
                <Link
                  href="#"
                  className={cn(
                    "text-sm py-2 px-3 rounded-lg gap-1 bg-slate-100 flex items-center text-blue-950",
                  )}
                >
                  <IconBulb size="20" />
                  Suggestions
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

const avargeScore = (score: number) => {
  return score;
};
