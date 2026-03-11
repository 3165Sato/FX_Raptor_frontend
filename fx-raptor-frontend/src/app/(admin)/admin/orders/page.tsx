"use client";

import { Suspense, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { EmptyState } from "@/components/common/EmptyState";
import { LoadingState } from "@/components/common/LoadingState";
import { Header } from "@/components/layout/Header";
import { OrderFilters } from "@/features/orders/components/OrderFilters";
import { OrdersTable } from "@/features/orders/components/OrdersTable";
import { useOrdersQuery } from "@/features/orders/hooks";
import { defaultOrderFilters, OrderFilters as OrderFilterValues } from "@/features/orders/types";
import { SummaryGrid } from "@/components/common/SummaryGrid";
import { MetricCard } from "@/components/common/MetricCard";
import { formatNumber } from "@/lib/formatters";

function readFilters(searchParams: URLSearchParams): OrderFilterValues {
  return {
    orderId: searchParams.get("orderId") ?? "",
    accountId: searchParams.get("accountId") ?? "",
    currencyPair: searchParams.get("currencyPair") ?? "",
    side: searchParams.get("side") ?? "",
    status: searchParams.get("status") ?? "",
    sourceType: searchParams.get("sourceType") ?? "",
  };
}

function toQuery(filters: OrderFilterValues) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      params.set(key, value);
    }
  }

  return params.toString();
}

function AdminOrdersContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialFilters = readFilters(searchParams);
  const [draftFilters, setDraftFilters] = useState<OrderFilterValues>(initialFilters);
  const { data, isFetching, isLoading } = useOrdersQuery(initialFilters);

  const orders = data?.items ?? [];
  const filledCount = orders.filter((order) => order.status === "FILLED").length;
  const pendingCount = orders.filter((order) => ["PENDING", "PROCESSING"].includes(order.status)).length;

  function handleSearch() {
    const query = toQuery(draftFilters);
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  function handleReset() {
    setDraftFilters(defaultOrderFilters);
    router.push(pathname);
  }

  return (
    <div>
      <Header
        title="注文一覧"
        description="管理者向けの注文照会画面です。口座や注文 ID を起点に一覧を横断できます。"
      />
      <main className="space-y-6 p-6">
        <SummaryGrid>
          <MetricCard label="表示件数" value={formatNumber(orders.length)} hint="現在のフィルタ結果" />
          <MetricCard label="FILLED 件数" value={formatNumber(filledCount)} hint="約定済み注文" />
          <MetricCard label="処理中件数" value={formatNumber(pendingCount)} hint="PENDING / PROCESSING" />
        </SummaryGrid>

        <OrderFilters
          value={draftFilters}
          onChange={setDraftFilters}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {isLoading ? (
          <LoadingState />
        ) : orders.length === 0 ? (
          <EmptyState title="注文がありません" description="フィルタ条件を変更するか、API 接続後に再確認してください。" />
        ) : (
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">注文テーブル</h2>
                <p className="mt-1 text-sm text-slate-500">口座 ID から accounts、注文 ID から同条件の注文一覧へ移動できます。</p>
              </div>
              {isFetching ? <div className="text-sm text-slate-500">Updating...</div> : null}
            </div>
            <OrdersTable orders={orders} />
          </section>
        )}
      </main>
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <Suspense fallback={<div className="p-6"><LoadingState /></div>}>
      <AdminOrdersContent />
    </Suspense>
  );
}
