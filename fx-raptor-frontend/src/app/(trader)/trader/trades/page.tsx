"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

import { EmptyState } from "@/components/common/EmptyState";
import { LoadingState } from "@/components/common/LoadingState";
import { Header } from "@/components/layout/Header";
import { TraderTradeFilters } from "@/features/trades/components/TraderTradeFilters";
import { TraderTradeSummaryCards } from "@/features/trades/components/TraderTradeSummaryCards";
import { TraderTradesTable } from "@/features/trades/components/TraderTradesTable";
import { useTraderTradesQuery } from "@/features/trades/hooks";
import {
  defaultTraderTradeFilters,
  TraderTradeFilters as TraderTradeFilterValues,
} from "@/features/trades/types";
import { useSessionStore } from "@/stores/sessionStore";

const fallbackAccountId = "A-100";

function readFilters(searchParams: URLSearchParams): TraderTradeFilterValues {
  return {
    currencyPair: searchParams.get("currencyPair") ?? "",
    side: searchParams.get("side") ?? "",
    orderId: searchParams.get("orderId") ?? "",
  };
}

function TraderTradesContent() {
  const selectedAccountId = useSessionStore((state) => state.selectedAccountId);
  const accountId = selectedAccountId ?? fallbackAccountId;
  const searchParams = useSearchParams();
  const initialFilters = readFilters(searchParams);
  const [draftFilters, setDraftFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<TraderTradeFilterValues>(initialFilters);
  const { data, isLoading, isFetching } = useTraderTradesQuery(accountId, appliedFilters);

  const trades = data?.items ?? [];

  function handleSearch() {
    setAppliedFilters(draftFilters);
  }

  function handleReset() {
    setDraftFilters(defaultTraderTradeFilters);
    setAppliedFilters(defaultTraderTradeFilters);
  }

  return (
    <div>
      <Header
        title="約定履歴"
        description="どの注文が、いくらで、どれだけ約定したかを確認できる投資家向けの約定一覧です。"
      />
      <main className="space-y-6 p-6">
        {isLoading ? (
          <LoadingState minHeightClassName="min-h-64" />
        ) : (
          <>
            {isFetching ? <div className="flex justify-end text-sm text-slate-500">Updating...</div> : null}

            <TraderTradeSummaryCards trades={trades} />

            <TraderTradeFilters
              value={draftFilters}
              onChange={setDraftFilters}
              onSearch={handleSearch}
              onReset={handleReset}
            />

            {trades.length === 0 ? (
              <EmptyState title="約定履歴がありません" description="フィルタ条件を変更するか、API 接続後に再確認してください。" />
            ) : (
              <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5">
                  <h2 className="text-lg font-semibold text-slate-900">約定一覧</h2>
                  <p className="mt-1 text-sm text-slate-500">注文 ID を指定すると、関連する約定だけを確認できます。</p>
                </div>
                <TraderTradesTable trades={trades} />
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default function TraderTradesPage() {
  return (
    <Suspense fallback={<div className="p-6"><LoadingState minHeightClassName="min-h-64" /></div>}>
      <TraderTradesContent />
    </Suspense>
  );
}
