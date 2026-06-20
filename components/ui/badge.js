import React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className = "", variant = "default", ...props }) {
  const base =
    variant === "outline"
      ? "border border-slate-200 bg-white text-slate-900"
      : "bg-slate-900 text-white";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition",
        base,
        className
      )}
      {...props}
    />
  );
}
