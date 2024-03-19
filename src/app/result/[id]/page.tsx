import { createClient } from "@/utils/supabase/client";
import { AxeResult } from "@/utils/types";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { A11yAccordion } from "@/components/accordion";
import { IconArrowLeft } from "@tabler/icons-react";

export default async function ResultPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const { data } = await supabase
    .from("web")
    .select("axe_result, url")
    .eq("id", params.id);

  if (!data) return null;

  const axeResult: AxeResult[] = data[0].axe_result;
  const url = data[0].url;

  return (
    <div>
      <div className={cn("flex items-center gap-4 animate-fadeIn")}>
        <Link href="/">
          <IconArrowLeft />
        </Link>
        <h1>
          <Link
            className={cn(
              "text-slate-600 text-2xl font-light underline underline-offset-4",
            )}
            href={url}
          >
            {url}
          </Link>
        </h1>
      </div>
      <h2
        className={cn("text-xl mb-2 font-medium mt-8 animate-fadeInChildren")}
      >
        Improvements
      </h2>
      <div
        className={cn(
          "flex gap-2 font-medium pb-8 border-b animate-fadeInChildren",
        )}
      >
        <div
          className={cn(
            "uppercase bg-sky-200 text-[10px] tracking-wide w-fit py-1 px-2 rounded-full",
          )}
        >
          Minor
        </div>
        <div
          className={cn(
            "uppercase bg-yellow-200 text-[10px] tracking-wide w-fit py-1 px-2 rounded-full",
          )}
        >
          Moderate
        </div>
        <div
          className={cn(
            "uppercase bg-red-200 text-[10px] tracking-wide w-fit py-1 px-2 rounded-full",
          )}
        >
          Serious
        </div>{" "}
        <div
          className={cn(
            "uppercase bg-red-800 text-red-50 text-[10px] tracking-wide w-fit py-1 px-2 rounded-full",
          )}
        >
          Critical
        </div>
      </div>
      <div className={cn("flex flex-col animate-fadeInChildren")}>
        {axeResult.map((result, index) => {
          const title = result.id
            .replace("-", " ")
            .replace(/^./, result.id[0].toUpperCase());
          return (
            <A11yAccordion
              title={title}
              key={result.id}
              id={result.id}
              nodes={result.nodes}
              impact={result.impact}
              helpUrl={result.helpUrl}
              help={result.help}
            />
          );
        })}
      </div>
    </div>
  );
}
