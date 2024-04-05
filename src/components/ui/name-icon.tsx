import { cn } from "@/utils/cn";

export const NameIcon = ({ name }: { name: string }) => {
  return (
    <div
      className={cn(
        "uppercase p-3 rounded-full bg-sky-900 text-sky-100 min-h-10 min-w-10 size-10 font-medium flex justify-center items-center",
      )}
    >
      {name}
    </div>
  );
};
