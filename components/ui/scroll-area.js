import React from "react";
import { cn } from "@/lib/utils";

export function ScrollArea({ className = "", children, ...props }) {
  return (
    <div className={cn("overflow-y-auto", className)} {...props}>
      {children}
    </div>
  );
}
