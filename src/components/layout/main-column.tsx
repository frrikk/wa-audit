import { cn } from "@/utils/cn";
import Link from "next/link";
import { HeaderMenu } from "@/components/ui/header-menu";

interface MainColumnProps {
  children: React.ReactNode;
  pageHeading: string;
  subHeading?: boolean;
  nameIcon: string;
  email: string;
}

export const MainColumn = ({
  children,
  pageHeading,
  subHeading,
  nameIcon,
  email,
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
        <HeaderMenu nameIcon={nameIcon} email={email} />
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
