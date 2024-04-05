"use client";

import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: "submit" | "logOut";
}

export const Button = ({
  buttonType,
  children,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "w-full flex p-3 justify-center text-center rounded-md",
        props.className,
        {
          "bg-slate-700 text-slate-100": buttonType === "logOut",
          "bg-sky-950 text-sky-50": buttonType === "submit",
        },
      )}
    >
      {children}
    </button>
  );
};
