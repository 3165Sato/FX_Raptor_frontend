"use client";

import { useState } from "react";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { MetricCard } from "@/components/common/MetricCard";
import { Header } from "@/components/layout/Header";
import { TradeFilters } from "@/features/trades/components/TradeFilters";
import { TradesTable } from "@/features/trades/components/TradesTable";
import { useTradesQuery } from "@/features/trades/hooks";
import { defaultTradeFilters, TradeFilters as TradeFilterValues } from "@/features/trades/types";
import { formatNumber } from "@/lib/formatters";

export default function AdminTradesPage() {
  const [draftFilters, setDraftFilters] = useState(defaultTradeFilters);
  const [appliedFilters, setAppliedFilters] = useState<TradeFilterValues>(defaultTradeFilters);
  const { data, isFetching, isLoading } = useTradesQuery(appliedFilters);

  const trades = data?.items ?? [];
  const buyCount = trades.filter((trade) => trade.side === "BUY").length;
  const sellCount = trades.filter((trade) => trade.side === "SELL").length;

  function handleSearch() {
    setAppliedFilters(draftFilters);
  }

  function handleReset() {
    setDraftFilters(defaultTradeFilters);
    setAppliedFilters(defaultTradeFilters);
  }

  return (
    <div>
      <Header title="約定一覧" description="管理者向けの約定照会画面です。注文結果をフィルタ条件ごとに確認できます。" />
      <main className="space-y-6 p-6">
        <section className="grid gap-4 lg:grid-cols-3">
          <MetricCard label="表示件数" value={formatNumber(trades.length)} hint="現在のフィルタ結果" />
          <MetricCard label="BUY 約定" value={formatNumber(buyCount)} hint="買い約定件数" />
          <MetricCard label="SELL 約定" value={formatNumber(sellCount)} hint="売り約定件数" />
        </section>

        <TradeFilters
          value={draftFilters}
          onChange={setDraftFilters}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">約定テーブル</h2>
              <p className="mt-1 text-sm text-slate-500">API 未接続時はモックデータに自動で fallback します。</p>
            </div>
            {isFetching ? <LoadingSpinner /> : null}
          </div>

          {isLoading ? (
            <div className="flex min-h-48 items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : trades.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
              <h3 className="text-lg font-semibold text-slate-900">約定がありません</h3>
              <p className="mt-2 text-sm text-slate-500">フィルタ条件を変更するか、API 接続後に再確認してください。</p>
            </div>
          ) : (
            <TradesTable trades={trades} />
          )}
        </section>
      </main>
    </div>
  );
}
