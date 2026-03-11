import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { formatDateTime, formatPrice } from "@/lib/formatters";

import { Quote } from "../types";

type QuotePanelProps = {
  quote?: Quote;
  isLoading: boolean;
};

export function QuotePanel({ quote, isLoading }: QuotePanelProps) {
  return (
    <section className="rounded-[2rem] border border-amber-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-600">Market</p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-950">現在レート</h2>
      <p className="mt-2 text-sm text-slate-500">現在の Bid / Ask を見ながら Trigger 価格を設定します。</p>

      <div className="mt-6">
        {isLoading ? (
          <LoadingSpinner />
        ) : quote ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">通貨ペア</p>
              <p className="mt-1 text-2xl font-semibold text-slate-950">{quote.currencyPair}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <p className="text-sm text-emerald-700">Bid</p>
                <p className="mt-1 text-3xl font-semibold text-emerald-900">{formatPrice(quote.bid)}</p>
              </div>
              <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
                <p className="text-sm text-rose-700">Ask</p>
                <p className="mt-1 text-3xl font-semibold text-rose-900">{formatPrice(quote.ask)}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">更新時刻</p>
              <p className="mt-1 font-medium text-slate-800">{formatDateTime(quote.timestamp)}</p>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
            レートを取得できませんでした。
          </div>
        )}
      </div>
    </section>
  );
}
