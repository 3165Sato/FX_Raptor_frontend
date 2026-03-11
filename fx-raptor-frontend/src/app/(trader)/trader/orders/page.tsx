"use client";

import { useState } from "react";

import { EmptyState } from "@/components/common/EmptyState";
import { LoadingState } from "@/components/common/LoadingState";
import { PageHeader } from "@/components/common/PageHeader";
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
          <LoadingState minHeightClassName="min-h-64" />
        ) : (
          <>
            {isFetching ? <div className="flex justify-end text-sm text-slate-500">Updating...</div> : null}

            <TraderOrderSummaryCards orders={orders} />

            <PageHeader
              title="関連画面"
              description="注文 ID をクリックすると、対応する約定履歴を同じ条件で確認できます。"
            />

            <TraderOrderFilters
              value={draftFilters}
              onChange={setDraftFilters}
              onSearch={handleSearch}
              onReset={handleReset}
            />

            {orders.length === 0 ? (
              <EmptyState title="注文履歴がありません" description="フィルタ条件を変更するか、API 接続後に再確認してください。" />
            ) : (
              <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5">
                  <h2 className="text-lg font-semibold text-slate-900">注文一覧</h2>
                  <p className="mt-1 text-sm text-slate-500">注文 ID から関連する約定履歴へ移動できます。</p>
                </div>
                <TraderOrdersTable orders={orders} />
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
