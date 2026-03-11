"use client";

import { ChangeEvent } from "react";

import type { TraderOrderFilters as TraderOrderFilterValues } from "@/features/orders/types";

type TraderOrderFiltersProps = {
  value: TraderOrderFilterValues;
  onChange: (filters: TraderOrderFilterValues) => void;
  onSearch: () => void;
  onReset: () => void;
};

const pairOptions = ["", "USD/JPY", "EUR/JPY", "GBP/JPY", "EUR/USD"];
const sideOptions = ["", "BUY", "SELL"];
const statusOptions = ["", "NEW", "FILLED", "CANCELLED", "REJECTED", "PROCESSING"];
const sourceOptions = ["", "USER", "TRIGGER", "LIQUIDATION"];

export function TraderOrderFilters({ value, onChange, onSearch, onReset }: TraderOrderFiltersProps) {
  function handleFieldChange(event: ChangeEvent<HTMLSelectElement>) {
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
        <p className="mt-1 text-sm text-slate-500">通貨ペア、売買区分、注文状態、発生元で注文履歴を絞り込みます。</p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">currencyPair</span>
          <select
            name="currencyPair"
            value={value.currencyPair}
            onChange={handleFieldChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-500"
          >
            {pairOptions.map((pair) => (
              <option key={pair || "all"} value={pair}>
                {pair || "すべて"}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">side</span>
          <select
            name="side"
            value={value.side}
            onChange={handleFieldChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-500"
          >
            {sideOptions.map((side) => (
              <option key={side || "all"} value={side}>
                {side || "すべて"}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">status</span>
          <select
            name="status"
            value={value.status}
            onChange={handleFieldChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-500"
          >
            {statusOptions.map((status) => (
              <option key={status || "all"} value={status}>
                {status || "すべて"}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">sourceType</span>
          <select
            name="sourceType"
            value={value.sourceType}
            onChange={handleFieldChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-500"
          >
            {sourceOptions.map((source) => (
              <option key={source || "all"} value={source}>
                {source || "すべて"}
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
