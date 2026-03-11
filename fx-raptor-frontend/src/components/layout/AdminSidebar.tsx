"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSessionStore } from "@/stores/sessionStore";
import { useUiStore } from "@/stores/uiStore";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/accounts", label: "Accounts" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/trades", label: "Trades" },
  { href: "/admin/positions", label: "Positions" },
  { href: "/admin/triggers", label: "Triggers" },
  { href: "/admin/covers", label: "Covers" },
  { href: "/admin/liquidations", label: "Liquidations" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const setRole = useSessionStore((state) => state.setRole);

  return (
    <aside
      className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-30 w-72 border-r border-slate-200 bg-slate-950 px-5 py-6 text-slate-100 transition md:static md:translate-x-0`}
    >
      <div className="rounded-3xl bg-white/5 p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">FX Raptor</p>
        <h2 className="mt-2 text-2xl font-semibold">Admin Console</h2>
        <p className="mt-2 text-sm text-slate-400">監視と照会に必要な一覧導線をまとめています。</p>
      </div>

      <nav className="mt-8 space-y-2">
        {adminLinks.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setRole("admin")}
              className={`flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active ? "bg-cyan-400 text-slate-950" : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-400">
        ID クリックで関連一覧へ移動できるように導線を整備しています。
      </div>
    </aside>
  );
}
