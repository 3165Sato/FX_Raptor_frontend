"use client";

import { ChangeEvent } from "react";

import { defaultOrderFilters } from "@/features/orders/types";
import type { OrderFilters as OrderFilterValues } from "@/features/orders/types";

type OrderFiltersProps = {
  value: OrderFilterValues;
  onChange: (filters: OrderFilterValues) => void;
  onSearch: () => void;
  onReset: () => void;
};

const statusOptions = ["", "PENDING", "PROCESSING", "FILLED", "CANCELLED", "REJECTED"];
const sourceOptions = ["", "USER", "TRIGGER", "LIQUIDATION"];

export function OrderFilters({ value, onChange, onSearch, onReset }: OrderFiltersProps) {
  function handleFieldChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value: nextValue } = event.target;

    onChange({
      ...value,
      [name]: nextValue,
    });
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">フィルタ</h2>
          <p className="mt-1 text-sm text-slate-500">口座、通貨ペア、ステータス、発生元で注文を絞り込みます。</p>
        </div>
        <button
          type="button"
          onClick={() => onChange(defaultOrderFilters)}
          className="hidden rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-500 md:inline-flex"
        >
          クリア
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">accountId</span>
          <input
            name="accountId"
            value={value.accountId}
            onChange={handleFieldChange}
            placeholder="A-100"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-cyan-500"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">currencyPair</span>
          <input
            name="currencyPair"
            value={value.currencyPair}
            onChange={handleFieldChange}
            placeholder="USD/JPY"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-cyan-500"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">status</span>
          <select
            name="status"
            value={value.status}
            onChange={handleFieldChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500"
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
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500"
          >
            {sourceOptions.map((sourceType) => (
              <option key={sourceType || "all"} value={sourceType}>
                {sourceType || "すべて"}
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
