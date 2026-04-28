import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Layout container for detail pages
 */
export function EntityDetailLayout({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2", className)}>
      {children}
    </div>
  );
}
