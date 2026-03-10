"use client";

import { useState } from "react";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { MetricCard } from "@/components/common/MetricCard";
import { Header } from "@/components/layout/Header";
import { OrderFilters } from "@/features/orders/components/OrderFilters";
import { OrdersTable } from "@/features/orders/components/OrdersTable";
import { useOrdersQuery } from "@/features/orders/hooks";
import { defaultOrderFilters, OrderFilters as OrderFilterValues } from "@/features/orders/types";
import { formatNumber } from "@/lib/formatters";

function summarizeByStatus(status: string) {
  switch (status) {
    case "FILLED":
      return "約定済み";
    case "PENDING":
    case "PROCESSING":
      return "待機中";
    case "CANCELLED":
    case "REJECTED":
      return "要確認";
    default:
      return "その他";
  }
}

export default function AdminOrdersPage() {
  const [draftFilters, setDraftFilters] = useState(defaultOrderFilters);
  const [appliedFilters, setAppliedFilters] = useState<OrderFilterValues>(defaultOrderFilters);
  const { data, isFetching, isLoading } = useOrdersQuery(appliedFilters);

  const orders = data?.items ?? [];
  const filledCount = orders.filter((order) => summarizeByStatus(order.status) === "約定済み").length;
  const pendingCount = orders.filter((order) => summarizeByStatus(order.status) === "待機中").length;

  function handleSearch() {
    setAppliedFilters(draftFilters);
  }

  function handleReset() {
    setDraftFilters(defaultOrderFilters);
    setAppliedFilters(defaultOrderFilters);
  }

  return (
    <div>
      <Header title="注文一覧" description="管理者向けの注文照会画面です。フィルタ条件に応じて一覧を確認できます。" />
      <main className="space-y-6 p-6">
        <section className="grid gap-4 lg:grid-cols-3">
          <MetricCard label="表示件数" value={formatNumber(orders.length)} hint="現在のフィルタ結果" />
          <MetricCard label="約定済み" value={formatNumber(filledCount)} hint="FILLED 件数" />
          <MetricCard label="待機中" value={formatNumber(pendingCount)} hint="PENDING / PROCESSING 件数" />
        </section>

        <OrderFilters
          value={draftFilters}
          onChange={setDraftFilters}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">注文テーブル</h2>
              <p className="mt-1 text-sm text-slate-500">API 未接続時はモックデータに自動で fallback します。</p>
            </div>
            {isFetching ? <LoadingSpinner /> : null}
          </div>

          {isLoading ? (
            <div className="flex min-h-48 items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
              <h3 className="text-lg font-semibold text-slate-900">注文がありません</h3>
              <p className="mt-2 text-sm text-slate-500">フィルタ条件を変更するか、API 接続後に再確認してください。</p>
            </div>
          ) : (
            <OrdersTable orders={orders} />
          )}
        </section>
      </main>
    </div>
  );
}
