import { cn } from "@/utils/cn";

export const GridList = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-10 mt-6",
      )}
    >
      {children}
    </ul>
  );
};
