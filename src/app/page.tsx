import { cn } from "@/utils/cn";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";

interface Data {
  id: string;
  url: string;
  accessibility_score: number;
  performance_score: number;
  best_practices_score: number;
  seo_score: number;
  axe_violations: number;
}

export const revalidate = 60;

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.from("web").select();

  const webData: Data[] = data as Data[];

  if (!webData) return null;

  const sortedData = webData
    .map((item) => ({
      ...item,
      score:
        item.accessibility_score +
        item.performance_score +
        item.best_practices_score +
        item.seo_score,
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <main className={cn("animate-fadeIn")}>
      <h1
        className={cn("font-light text-3xl antialiased transition ease-in-out")}
      >
        Web Performance for Tietoevry Norway related websites
      </h1>
      <p className={cn("font-light text-sm mt-2 mb-8")}>
        Tests done by{" "}
        <Link
          className={cn("underline underline-offset-4 text-blue-900")}
          href="https://developer.chrome.com/docs/lighthouse/performance/performance-scoring"
        >
          Lighthouse
        </Link>{" "}
        and{" "}
        <Link
          href="https://www.deque.com/axe/"
          className={cn("underline underline-offset-4 text-blue-900")}
        >
          Axe
        </Link>
      </p>
      <ul className={cn("flex flex-col")}>
        {sortedData.map((site, index) => {
          const scoreSum =
            site.accessibility_score +
            site.performance_score +
            site.best_practices_score +
            site.seo_score;

          const scoreAvarge = avargeScore(scoreSum) / 4;

          const scoreColor = (score: number) => {
            if (score < 50) {
              return "py-1 px-2 flex gap-1 items-center rounded-sm bg-red-100 [span]:text-slate-50";
            } else if (score < 90 && score >= 50) {
              return "py-1 px-2 flex gap-1 items-center rounded-sm bg-yellow-100";
            } else {
              return "py-1 px-2 flex gap-1 items-center rounded-sm bg-green-100";
            }
          };

          return (
            <li
              key={`${index}-${site.url}`}
              className={cn(
                "flex flex-col border-b py-4 animate-fadeInChildren",
              )}
            >
              <div className={cn("flex gap-3 items-center")}>
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
                  className={cn(
                    "p-2 text-xs font-semibold rounded-md w-[34px] h-[34px] flex justify-center",
                    {
                      "bg-red-300": scoreAvarge < 50,
                      "bg-yellow-300": scoreAvarge < 90 && scoreAvarge >= 50,
                      "bg-green-300": scoreAvarge >= 90,
                    },
                  )}
                >
                  {Math.round(scoreAvarge)}
                </div>
              </div>
              <div
                className={cn(
                  "flex justify-between flex-col lg:flex-row gap-5 lg:gap-1 items-baseline",
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
                {site.axe_violations > 0 ? (
                  <Link
                    href={`result/${site.id}`}
                    className={cn(
                      "uppercase tracking-wide font-medium text-[10px] p-2 relative bg-sky-50 rounded-md gap-1 flex items-center text-sky-900 hover:bg-sky-200 transition",
                    )}
                  >
                    A11Y improvements <IconArrowRight size={12} />
                    <div
                      className={cn(
                        "bg-sky-600 w-[20px]  h-[20px] text-white flex justify-center items-center rounded-md absolute -top-[14px] -right-[10px]",
                      )}
                    >
                      <span className={cn("relative left-[.5px]")}>
                        {site.axe_violations}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div
                    className={cn(
                      "uppercase tracking-wide font-medium text-[10px] p-2 bg-green-100 rounded-md gap-1 flex items-center text-green-900 transition cursor-default relative",
                    )}
                  >
                    a11y on point{" "}
                    <IconCheck
                      size={12}
                      className={cn(
                        "bg-green-800 w-[20px] h-[20px] rounded-md p-1 absolute -top-[14px] -right-[10px]",
                      )}
                      color="white"
                    />
                  </div>
                )}
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
