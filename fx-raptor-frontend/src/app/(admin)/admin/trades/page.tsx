"use client";

import { Suspense, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { EmptyState } from "@/components/common/EmptyState";
import { LoadingState } from "@/components/common/LoadingState";
import { SummaryGrid } from "@/components/common/SummaryGrid";
import { MetricCard } from "@/components/common/MetricCard";
import { Header } from "@/components/layout/Header";
import { TradeFilters } from "@/features/trades/components/TradeFilters";
import { TradesTable } from "@/features/trades/components/TradesTable";
import { useTradesQuery } from "@/features/trades/hooks";
import { defaultTradeFilters, TradeFilters as TradeFilterValues } from "@/features/trades/types";
import { formatNumber } from "@/lib/formatters";

function readFilters(searchParams: URLSearchParams): TradeFilterValues {
  return {
    tradeId: searchParams.get("tradeId") ?? "",
    accountId: searchParams.get("accountId") ?? "",
    currencyPair: searchParams.get("currencyPair") ?? "",
    side: searchParams.get("side") ?? "",
    orderId: searchParams.get("orderId") ?? "",
  };
}

function toQuery(filters: TradeFilterValues) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      params.set(key, value);
    }
  }

  return params.toString();
}

function AdminTradesContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialFilters = readFilters(searchParams);
  const [draftFilters, setDraftFilters] = useState<TradeFilterValues>(initialFilters);
  const { data, isFetching, isLoading } = useTradesQuery(initialFilters);

  const trades = data?.items ?? [];
  const buyCount = trades.filter((trade) => trade.side === "BUY").length;
  const sellCount = trades.filter((trade) => trade.side === "SELL").length;

  function handleSearch() {
    const query = toQuery(draftFilters);
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  function handleReset() {
    setDraftFilters(defaultTradeFilters);
    router.push(pathname);
  }

  return (
    <div>
      <Header
        title="約定一覧"
        description="管理者向けの約定照会画面です。口座 ID、注文 ID、約定 ID から関連一覧へ移動できます。"
      />
      <main className="space-y-6 p-6">
        <SummaryGrid>
          <MetricCard label="表示件数" value={formatNumber(trades.length)} hint="現在のフィルタ結果" />
          <MetricCard label="BUY 件数" value={formatNumber(buyCount)} hint="買い約定" />
          <MetricCard label="SELL 件数" value={formatNumber(sellCount)} hint="売り約定" />
        </SummaryGrid>

        <TradeFilters
          value={draftFilters}
          onChange={setDraftFilters}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {isLoading ? (
          <LoadingState />
        ) : trades.length === 0 ? (
          <EmptyState title="約定がありません" description="フィルタ条件を変更するか、API 接続後に再確認してください。" />
        ) : (
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">約定テーブル</h2>
                <p className="mt-1 text-sm text-slate-500">口座 ID から accounts、注文 ID から orders へ移動できます。</p>
              </div>
              {isFetching ? <div className="text-sm text-slate-500">Updating...</div> : null}
            </div>
            <TradesTable trades={trades} />
          </section>
        )}
      </main>
    </div>
  );
}

export default function AdminTradesPage() {
  return (
    <Suspense fallback={<div className="p-6"><LoadingState /></div>}>
      <AdminTradesContent />
    </Suspense>
  );
}
