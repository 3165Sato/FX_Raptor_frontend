"use client";

import { usePathname } from "next/navigation";

import { useUiStore } from "@/stores/uiStore";

type HeaderProps = {
  title: string;
  description: string;
};

export function Header({ title, description }: HeaderProps) {
  const pathname = usePathname();
  const activePair = useUiStore((state) => state.activePair);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 bg-white/80 px-6 py-5 backdrop-blur md:flex-row md:items-start md:justify-between">
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={toggleSidebar}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 md:hidden"
          aria-label="Toggle sidebar"
        >
          <span className="text-lg">≡</span>
        </button>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">{pathname}</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-950">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <div className="grid min-w-[220px] grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Pair</p>
          <p className="mt-1 font-semibold text-slate-800">{activePair}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Mode</p>
          <p className="mt-1 font-semibold text-slate-800">Sandbox</p>
        </div>
      </div>
    </header>
  );
}
