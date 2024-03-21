import { cn } from "@/utils/cn";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { SupabaseData } from "@/utils/types";

export const revalidate = 60;

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.from("web").select();

  const webData: SupabaseData[] = data as SupabaseData[];

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
      <ul
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-10",
        )}
      >
        {sortedData.map((site, index) => {
          const scoreSum =
            site.accessibility_score +
            site.performance_score +
            site.best_practices_score +
            site.seo_score;

          const scoreAvarage = avargeScore(scoreSum) / 4;

          return (
            <PageCard
              {...site}
              key={site.id}
              avarageScore={Math.round(scoreAvarage)}
            />
          );
        })}
      </ul>
    </main>
  );
}

const avargeScore = (score: number) => {
  return score;
};

const PageCard = ({ ...props }: SupabaseData) => {
  const scores = [
    {
      name: "Accessibility",
      score: props.accessibility_score,
    },
    {
      name: "Performance",
      score: props.performance_score,
    },
    {
      name: "Best Practices",
      score: props.best_practices_score,
    },
    {
      name: "SEO",
      score: props.seo_score,
    },
  ];

  return (
    <Link
      href={`/result/${props.id}`}
      className={cn(
        "bg-white rounded-lg animate-fadeInChildren font-light p-6 transition hover:shadow-xl hover:shadow-gray-200",
      )}
    >
      <div className={cn("flex justify-between items-center")}>
        <div className={cn("flex flex-col")}>
          <h2 className={cn("text-lg text-black font-normal")}>{props.name}</h2>
          <div className={cn("text-stone-500 font-normal text-lg")}>
            {props.url}
          </div>
        </div>
        <div
          className={cn(
            "rounded-lg size-[42px] flex justify-center items-center font-normal text-lg",
            {
              "bg-green-300": props.avarageScore >= 90,
              "bg-yellow-300":
                props.avarageScore < 90 && props.avarageScore >= 50,
              "bg-red-300": props.avarageScore < 50,
            },
          )}
        >
          {props.avarageScore}
        </div>
      </div>

      <hr className={cn("my-4")} />

      <div className={cn("flex flex-col gap-4 relative")}>
        <div className={cn("flex flex-col gap-2")}>
          <h3 className={cn("tracking-wide uppercase text-xs font-normal")}>
            Lighthouse
          </h3>
          <div className={cn("flex flex-wrap gap-3")}>
            {scores.map((score, index) => (
              <p
                key={index}
                className={cn(
                  "px-2 py-2 font-normal gap-1 flex rounded-md uppercase text-xs w-fit tracking-wide",
                  {
                    "bg-red-200 text-red-950": score.score < 50,
                    "bg-yellow-100 text-yellow-950":
                      score.score < 90 && score.score >= 50,
                    "bg-green-200 text-green-950": score.score >= 90,
                  },
                )}
              >
                {score.name}
                <span className={cn("text-inherit")}>|</span>
                <span className={cn("font-semibold")}>{score.score}</span>
              </p>
            ))}
          </div>
        </div>
        <div className={cn("mt-2 flex flex-col gap-2")}>
          <h3 className={cn("tracking-wide uppercase text-xs font-normal")}>
            Axe
          </h3>
          <div>
            <div
              className={cn(
                "px-3 py-2 bg-sky-200 text-sky-950 font-normal gap-1 flex rounded-md uppercase text-xs w-fit tracking-wide relative",
              )}
            >
              Accessibility improvements
              <div
                className={cn(
                  "absolute -top-3 -right-3 font-semibold flex justify-center items-center p-1 bg-sky-700 size-[24px] rounded-full text-white",
                )}
              >
                {props.axe_violations}
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className={cn("my-6")} />

      <div>
        <h3 className={cn("tracking-wide uppercase text-xs font-normal")}>
          Segment
        </h3>
        <p className={cn("text-lg text-black font-normal")}>{props.segment}</p>
      </div>
    </Link>
  );
};
