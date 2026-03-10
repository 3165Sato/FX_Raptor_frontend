import { ReactNode } from "react";

import { TraderSidebar } from "@/components/layout/TraderSidebar";

export default function TraderGroupLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-amber-50 md:grid md:grid-cols-[18rem_1fr]">
      <TraderSidebar />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
