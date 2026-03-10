import { ReactNode } from "react";

import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminGroupLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 md:grid md:grid-cols-[18rem_1fr]">
      <AdminSidebar />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
