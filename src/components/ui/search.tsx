"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/utils/cn";
import { IconSearch } from "@tabler/icons-react";

export const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 0);

  return (
    <div
      className={cn(
        "sticky bg-gray-100 top-0 flex flex-col my-4 gap-1 z-10 pt-4 pb-2",
      )}
    >
      <div className={cn("relative flex flex-col gap-1")}>
        <div
          className={cn(
            "absolute w-full h-[42px] -bottom-[44px] bg-gradient-to-b from-gray-100 via-gray-100 via-10%",
          )}
        />
        <label htmlFor="search" className={cn("text-sm font-light ")}>
          Search companies or segment
        </label>

        <IconSearch
          size={18}
          color="gray"
          className={cn(
            "absolute flex justify-center items-center bottom-[11px] left-2",
          )}
        />

        <input
          autoFocus
          placeholder="Equinor"
          type="text"
          defaultValue={searchParams.get("query")?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
          className={cn("p-2 rounded-md placeholder:text-sm pl-8")}
        />
      </div>
    </div>
  );
};
