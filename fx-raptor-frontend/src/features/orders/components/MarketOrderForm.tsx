"use client";

import { FormEvent, useState } from "react";

import { MarketOrderRequest, MarketOrderResponse } from "../types";

type MarketOrderFormProps = {
  initialValue: MarketOrderRequest;
  onSubmit: (payload: MarketOrderRequest) => Promise<MarketOrderResponse>;
  isSubmitting: boolean;
  onCurrencyPairChange?: (currencyPair: string) => void;
};

const accountOptions = ["A-100", "A-220", "A-305"];
const pairOptions = ["USD/JPY", "EUR/JPY", "GBP/JPY"];

export function MarketOrderForm({
  initialValue,
  onSubmit,
  isSubmitting,
  onCurrencyPairChange,
}: MarketOrderFormProps) {
  const [form, setForm] = useState<MarketOrderRequest>(initialValue);
  const [errors, setErrors] = useState<Partial<Record<keyof MarketOrderRequest, string>>>({});

  function validate() {
    const nextErrors: Partial<Record<keyof MarketOrderRequest, string>> = {};

    if (!form.currencyPair) {
      nextErrors.currencyPair = "通貨ペアは必須です。";
    }

    if (!form.side) {
      nextErrors.side = "売買区分は必須です。";
    }

    if (!form.quantity || form.quantity <= 0) {
      nextErrors.quantity = "数量は 0 より大きい値を入力してください。";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    await onSubmit(form);
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-600">Order</p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-950">成行注文フォーム</h2>
      <p className="mt-2 text-sm text-slate-500">現在レートを確認しながら、BUY / SELL の成行注文を送信します。</p>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">accountId</span>
          <select
            value={String(form.accountId)}
            onChange={(event) => setForm((prev) => ({ ...prev, accountId: event.target.value }))}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-500"
          >
            {accountOptions.map((accountId) => (
              <option key={accountId} value={accountId}>
                {accountId}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">通貨ペア</span>
          <select
            value={form.currencyPair}
            onChange={(event) => {
              const currencyPair = event.target.value;
              setForm((prev) => ({ ...prev, currencyPair }));
              onCurrencyPairChange?.(currencyPair);
            }}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-500"
          >
            {pairOptions.map((pair) => (
              <option key={pair} value={pair}>
                {pair}
              </option>
            ))}
          </select>
          {errors.currencyPair ? <p className="text-sm text-rose-600">{errors.currencyPair}</p> : null}
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">売買区分</span>
            <div className="grid grid-cols-2 gap-3">
              {(["BUY", "SELL"] as const).map((side) => (
                <button
                  key={side}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, side }))}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    form.side === side
                      ? side === "BUY"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-rose-500 bg-rose-50 text-rose-700"
                      : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  {side}
                </button>
              ))}
            </div>
            {errors.side ? <p className="text-sm text-rose-600">{errors.side}</p> : null}
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">数量</span>
            <input
              type="number"
              min={1}
              step={1000}
              value={form.quantity}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, quantity: Number(event.target.value) || 0 }))
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-500"
            />
            {errors.quantity ? <p className="text-sm text-rose-600">{errors.quantity}</p> : null}
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "送信中..." : "成行注文を送信"}
        </button>
      </form>
    </section>
  );
}
