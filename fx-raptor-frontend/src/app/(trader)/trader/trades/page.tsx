"use client";

import { useState } from "react";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";
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

export default function TraderTradesPage() {
  const selectedAccountId = useSessionStore((state) => state.selectedAccountId);
  const accountId = selectedAccountId ?? fallbackAccountId;
  const [draftFilters, setDraftFilters] = useState(defaultTraderTradeFilters);
  const [appliedFilters, setAppliedFilters] = useState<TraderTradeFilterValues>(defaultTraderTradeFilters);
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
          <div className="flex min-h-64 items-center justify-center rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {isFetching ? (
              <div className="flex justify-end">
                <LoadingSpinner />
              </div>
            ) : null}

            <TraderTradeSummaryCards trades={trades} />

            <TraderTradeFilters
              value={draftFilters}
              onChange={setDraftFilters}
              onSearch={handleSearch}
              onReset={handleReset}
            />

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">約定一覧</h2>
                  <p className="mt-1 text-sm text-slate-500">注文 ID ごとの約定結果を確認できます。</p>
                </div>
              </div>

              {trades.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                  <h3 className="text-lg font-semibold text-slate-900">約定履歴がありません</h3>
                  <p className="mt-2 text-sm text-slate-500">フィルタ条件を変更するか、API 接続後に再確認してください。</p>
                </div>
              ) : (
                <TraderTradesTable trades={trades} />
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
