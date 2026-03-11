"use client";

import { FormEvent, useState } from "react";

import { TriggerOrderRequest, TriggerOrderResponse } from "../types";

type TriggerOrderFormProps = {
  initialValue: TriggerOrderRequest;
  onSubmit: (payload: TriggerOrderRequest) => Promise<TriggerOrderResponse>;
  isSubmitting: boolean;
  onCurrencyPairChange?: (currencyPair: string) => void;
};

const accountOptions = ["A-100", "A-220", "A-305"];
const pairOptions = ["USD/JPY", "EUR/JPY", "GBP/JPY"];

export function TriggerOrderForm({
  initialValue,
  onSubmit,
  isSubmitting,
  onCurrencyPairChange,
}: TriggerOrderFormProps) {
  const [form, setForm] = useState<TriggerOrderRequest>(initialValue);
  const [errors, setErrors] = useState<Partial<Record<keyof TriggerOrderRequest, string>>>({});

  function validate() {
    const nextErrors: Partial<Record<keyof TriggerOrderRequest, string>> = {};

    if (!form.currencyPair) {
      nextErrors.currencyPair = "通貨ペアは必須です。";
    }

    if (!form.side) {
      nextErrors.side = "売買区分は必須です。";
    }

    if (!form.triggerType) {
      nextErrors.triggerType = "Trigger 種別は必須です。";
    }

    if (!form.triggerPrice || form.triggerPrice <= 0) {
      nextErrors.triggerPrice = "Trigger 価格は 0 より大きい値を入力してください。";
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
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-600">Trigger</p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-950">Trigger 注文フォーム</h2>
      <p className="mt-2 text-sm text-slate-500">STOP と TAKE_PROFIT を現在レートを基準に登録できます。</p>

      <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-slate-600">
        <p className="font-medium text-slate-800">価格の考え方</p>
        <p className="mt-1">STOP は損失抑制、TAKE_PROFIT は利益確定を想定したトリガーです。</p>
      </div>

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
            <span className="text-sm font-medium text-slate-700">Trigger 種別</span>
            <select
              value={form.triggerType}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  triggerType: event.target.value as TriggerOrderRequest["triggerType"],
                }))
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-500"
            >
              <option value="STOP">STOP</option>
              <option value="TAKE_PROFIT">TAKE_PROFIT</option>
            </select>
            {errors.triggerType ? <p className="text-sm text-rose-600">{errors.triggerType}</p> : null}
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Trigger 価格</span>
            <input
              type="number"
              min={0.0001}
              step={0.0001}
              value={form.triggerPrice}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, triggerPrice: Number(event.target.value) || 0 }))
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-500"
            />
            {errors.triggerPrice ? <p className="text-sm text-rose-600">{errors.triggerPrice}</p> : null}
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
          {isSubmitting ? "登録中..." : "Trigger 注文を登録"}
        </button>
      </form>
    </section>
  );
}
