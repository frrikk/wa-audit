import { cn } from "@/utils/cn";
import Link from "next/link";

interface MainColumnProps {
  children: React.ReactNode;
  pageHeading: string;
  subHeading?: boolean;
}

export const MainColumn = ({
  children,
  pageHeading,
  subHeading,
}: MainColumnProps) => {
  return (
    <main className={cn("animate-fadeIn")}>
      <div className={cn("flex justify-between gap-2")}>
        <h1
          className={cn(
            "font-light text-xl lg:text-3xl antialiased transition ease-in-out",
          )}
        >
          {pageHeading}
        </h1>
        <div
          className={cn(
            "p-3 rounded-full bg-sky-900 text-sky-100 min-h-10 min-w-10 size-10 font-medium flex justify-center items-center",
          )}
        >
          {/*{user}*/}F
        </div>
      </div>
      {subHeading ? (
        <p className={cn("font-light text-sm mt-2")}>
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
      ) : null}
      {children}
    </main>
  );
};
