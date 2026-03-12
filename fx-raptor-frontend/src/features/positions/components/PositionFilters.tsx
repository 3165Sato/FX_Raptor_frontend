"use client";

import { ChangeEvent } from "react";

import type { PositionFilters as PositionFilterValues } from "@/features/positions/types";

type PositionFiltersProps = {
  value: PositionFilterValues;
  onChange: (filters: PositionFilterValues) => void;
  onSearch: () => void;
  onReset: () => void;
};

const sideOptions = ["", "BUY", "SELL"];

export function PositionFilters({ value, onChange, onSearch, onReset }: PositionFiltersProps) {
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
        <p className="mt-1 text-sm text-slate-500">口座ID、通貨ペア、売買区分でポジションを絞り込みます。</p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">accountId</span>
          <input
            name="accountId"
            value={value.accountId}
            onChange={handleFieldChange}
            placeholder="1"
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
