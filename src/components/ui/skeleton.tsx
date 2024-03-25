import { Skeleton as MantineSkeleton } from "@mantine/core";
import { cn } from "@/utils/cn";

export const Skeleton = () => {
  return <MantineSkeleton className={cn("h-[100px]")} />;
};
