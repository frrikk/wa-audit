"use client";

import { Accordion as Accordion } from "@mantine/core";
import { cn } from "@/utils/cn";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";

interface AccordionProps {
  id: string;
  impact: "moderate" | "serious" | "minor" | "critical";
  helpUrl: string;
  help: string;
  nodes: any[];
  title: string;
}

export function A11yAccordion({
  nodes,
  id,
  impact,
  helpUrl,
  help,
  title,
}: AccordionProps) {
  if (!nodes) return null;

  return (
    <Accordion>
      <Accordion.Item key={id} value={title}>
        <Accordion.Control className={cn("uppercase text-xs tracking-wide")}>
          <div className={cn("flex gap-2 items-center")}>
            <p>{title}</p>
            <span
              className={cn(
                "bg-sky-200 rounded-md min-w-[22px] min-h-[22px] font-medium flex self-center justify-center items-center",
                {
                  "bg-sky-200": impact === "minor",
                  "bg-red-200": impact === "serious",
                  "bg-red-700 text-red-50": impact === "critical",
                  "bg-yellow-200": impact === "moderate",
                },
              )}
            >
              {nodes.length}
            </span>
          </div>
        </Accordion.Control>
        <Accordion.Panel className={cn("text-sm flex flex-col")}>
          <p className={cn("mb-4 text-lg font-light")}>{help}</p>
          <Link
            href={helpUrl}
            target="_blank"
            className={cn(
              "text-slate-700 group underline-offset-4 underline flex gap-2 transition hover:text-blue-700",
            )}
          >
            How to fix this?
            <IconArrowUpRight size={18} />
          </Link>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
