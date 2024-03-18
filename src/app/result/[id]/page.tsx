import { createClient } from "@/utils/supabase/client";
import { AxeResult } from "@/utils/types";
import Link from "next/link";
import { cn } from "@/utils/cn";

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

  console.log(axeResult);

  return (
    <>
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
      <h2 className={cn("text-xl mb-6 font-medium mt-8")}>Improvements</h2>
      <ul className={cn("flex flex-col gap-4")}>
        {axeResult.map((result, index) => {
          const title = result.id
            .replace("-", " ")
            .replace(/^./, result.id[0].toUpperCase());
          return (
            <li key={index} className={cn("border-b pb-2")}>
              <p
                className={cn(
                  "uppercase w-fit px-2 py-1 rounded-md text-[10px] tracking-wide font-medium bg-sky-50 text-sky-950",
                )}
              >
                {title}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
