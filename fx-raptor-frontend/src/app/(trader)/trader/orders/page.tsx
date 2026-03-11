"use client";

import { useState } from "react";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Header } from "@/components/layout/Header";
import { TraderOrderFilters } from "@/features/orders/components/TraderOrderFilters";
import { TraderOrdersTable } from "@/features/orders/components/TraderOrdersTable";
import { TraderOrderSummaryCards } from "@/features/orders/components/TraderOrderSummaryCards";
import { useTraderOrdersQuery } from "@/features/orders/hooks";
import {
  defaultTraderOrderFilters,
  TraderOrderFilters as TraderOrderFilterValues,
} from "@/features/orders/types";
import { useSessionStore } from "@/stores/sessionStore";

const fallbackAccountId = "A-100";

export default function TraderOrdersPage() {
  const selectedAccountId = useSessionStore((state) => state.selectedAccountId);
  const accountId = selectedAccountId ?? fallbackAccountId;
  const [draftFilters, setDraftFilters] = useState(defaultTraderOrderFilters);
  const [appliedFilters, setAppliedFilters] = useState<TraderOrderFilterValues>(defaultTraderOrderFilters);
  const { data, isLoading, isFetching } = useTraderOrdersQuery(accountId, appliedFilters);

  const orders = data?.items ?? [];

  function handleSearch() {
    setAppliedFilters(draftFilters);
  }

  function handleReset() {
    setDraftFilters(defaultTraderOrderFilters);
    setAppliedFilters(defaultTraderOrderFilters);
  }

  return (
    <div>
      <Header
        title="注文履歴"
        description="自分の注文内容、ステータス、発生元を確認できる投資家向けの注文一覧です。"
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

            <TraderOrderSummaryCards orders={orders} />

            <section className="rounded-[2rem] border border-amber-100 bg-amber-50/70 px-5 py-4 text-sm text-slate-600">
              <p className="font-medium text-slate-800">注文ステータスの見方</p>
              <p className="mt-1">NEW は受付済み、FILLED は約定済み、TRIGGER はトリガー由来の注文を示します。</p>
            </section>

            <TraderOrderFilters
              value={draftFilters}
              onChange={setDraftFilters}
              onSearch={handleSearch}
              onReset={handleReset}
            />

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">注文一覧</h2>
                  <p className="mt-1 text-sm text-slate-500">直近の注文履歴を表示しています。</p>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                  <h3 className="text-lg font-semibold text-slate-900">注文履歴がありません</h3>
                  <p className="mt-2 text-sm text-slate-500">フィルタ条件を変更するか、API 接続後に再確認してください。</p>
                </div>
              ) : (
                <TraderOrdersTable orders={orders} />
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
