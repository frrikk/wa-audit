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
  }, 150);

  return (
    <div className={cn("relative flex flex-col my-4")}>
      <label htmlFor="search" className={cn("text-sm font-light")}>
        Search companies
      </label>

      <IconSearch
        size={18}
        color="gray"
        className={cn(
          "absolute flex justify-center items-center bottom-[10px] left-2",
        )}
      />

      <input
        placeholder="Name or segment"
        type="text"
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className={cn("w-full p-2 rounded-md placeholder:text-sm pl-8")}
      />
    </div>
  );
};
