"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSessionStore } from "@/stores/sessionStore";
import { useUiStore } from "@/stores/uiStore";

const traderLinks = [
  { href: "/trader/order", label: "Order" },
  { href: "/trader/trigger", label: "Trigger" },
  { href: "/trader/account", label: "Account" },
  { href: "/trader/positions", label: "Positions" },
  { href: "/trader/orders", label: "Orders" },
  { href: "/trader/trades", label: "Trades" },
];

export function TraderSidebar() {
  const pathname = usePathname();
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const setRole = useSessionStore((state) => state.setRole);

  return (
    <aside
      className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-30 w-72 border-r border-amber-200 bg-[#1f2937] px-5 py-6 text-slate-100 transition md:static md:translate-x-0`}
    >
      <div className="rounded-3xl bg-white/5 p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-amber-300">FX Raptor</p>
        <h2 className="mt-2 text-2xl font-semibold">Trader Console</h2>
        <p className="mt-2 text-sm text-slate-400">発注、口座確認、履歴確認を迷わず移動できる構成です。</p>
      </div>

      <nav className="mt-8 space-y-2">
        {traderLinks.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setRole("trader")}
              className={`flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active ? "bg-amber-300 text-slate-950" : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-400">
        Header の account selector で表示対象口座を切り替えられます。
      </div>
    </aside>
  );
}
