"use client";

import { ChangeEvent } from "react";

import type { LiquidationFilters as LiquidationFilterValues } from "@/features/liquidations/types";

type LiquidationFiltersProps = {
  value: LiquidationFilterValues;
  onChange: (filters: LiquidationFilterValues) => void;
  onSearch: () => void;
  onReset: () => void;
};

const sideOptions = ["", "BUY", "SELL"];
const reasonOptions = ["", "MARGIN_CALL_BREACH", "AUTO_CUT", "RISK_LIMIT_EXCEEDED"];

export function LiquidationFilters({
  value,
  onChange,
  onSearch,
  onReset,
}: LiquidationFiltersProps) {
  function handleFieldChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value: nextValue } = event.target;

    onChange({
      ...value,
      [name]: nextValue,
    });
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">フィルタ</h2>
        <p className="mt-1 text-sm text-slate-500">口座、通貨ペア、売買区分、ロスカット理由で履歴を絞り込みます。</p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">accountId</span>
          <input
            name="accountId"
            value={value.accountId}
            onChange={handleFieldChange}
            placeholder="A-220"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">currencyPair</span>
          <input
            name="currencyPair"
            value={value.currencyPair}
            onChange={handleFieldChange}
            placeholder="USD/JPY"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">side</span>
          <select
            name="side"
            value={value.side}
            onChange={handleFieldChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500"
          >
            {sideOptions.map((side) => (
              <option key={side || "all"} value={side}>
                {side || "すべて"}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">liquidationReason</span>
          <select
            name="liquidationReason"
            value={value.liquidationReason}
            onChange={handleFieldChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500"
          >
            {reasonOptions.map((reason) => (
              <option key={reason || "all"} value={reason}>
                {reason || "すべて"}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onSearch}
          className="inline-flex items-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          検索
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          リセット
        </button>
      </div>
    </section>
  );
}
