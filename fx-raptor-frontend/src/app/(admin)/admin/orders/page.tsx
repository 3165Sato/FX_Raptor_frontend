"use client";

import { Suspense, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { EmptyState } from "@/components/common/EmptyState";
import { LoadingState } from "@/components/common/LoadingState";
import { MetricCard } from "@/components/common/MetricCard";
import { SummaryGrid } from "@/components/common/SummaryGrid";
import { Header } from "@/components/layout/Header";
import { OrderFilters } from "@/features/orders/components/OrderFilters";
import { OrdersTable } from "@/features/orders/components/OrdersTable";
import { useAdminOrdersQuery } from "@/features/orders/hooks";
import { defaultOrderFilters, OrderFilters as OrderFilterValues } from "@/features/orders/types";
import { ApiError } from "@/lib/apiClient";
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

function getErrorDescription(error: Error) {
  if (error instanceof ApiError) {
    return `API request failed: ${error.status}`;
  }

  return error.message || "注文一覧の取得に失敗しました。";
}

type AdminOrdersViewProps = {
  filters: OrderFilterValues;
};

function AdminOrdersView({ filters }: AdminOrdersViewProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [draftFilters, setDraftFilters] = useState<OrderFilterValues>(filters);
  const { data, isFetching, isLoading, isError, error } = useAdminOrdersQuery(filters);

  const orders = data?.items ?? [];
  const filledCount = orders.filter((order) => order.status === "FILLED").length;
  const newCount = orders.filter((order) => order.status === "NEW").length;
  const triggerCount = orders.filter((order) => order.sourceType === "TRIGGER").length;

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
        description="Spring Boot の GET /admin/orders から注文一覧を取得して表示します。"
      />
      <main className="space-y-6 p-6">
        <SummaryGrid>
          <MetricCard label="総注文件数" value={formatNumber(data?.total ?? 0)} hint="取得した注文件数" />
          <MetricCard label="FILLED件数" value={formatNumber(filledCount)} hint="約定済み" />
          <MetricCard label="NEW件数" value={formatNumber(newCount)} hint="新規受付" />
          <MetricCard label="TRIGGER由来件数" value={formatNumber(triggerCount)} hint="sourceType=TRIGGER" />
        </SummaryGrid>

        <OrderFilters
          value={draftFilters}
          onChange={setDraftFilters}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <EmptyState title="注文一覧を取得できませんでした" description={getErrorDescription(error)} />
        ) : orders.length === 0 ? (
          <EmptyState
            title="注文データがありません"
            description="フィルタ条件を見直すか、Spring Boot 側の /admin/orders レスポンスを確認してください。"
          />
        ) : (
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">注文テーブル</h2>
                <p className="mt-1 text-sm text-slate-500">
                  accountId から口座一覧へ、orderId から注文一覧の絞り込みへ移動できます。
                </p>
              </div>
              {isFetching ? <div className="text-sm text-slate-500">更新中...</div> : null}
            </div>
            <OrdersTable orders={orders} />
          </section>
        )}
      </main>
    </div>
  );
}

function AdminOrdersContent() {
  const searchParams = useSearchParams();
  const searchParamsKey = searchParams.toString();
  const filters = readFilters(searchParams);

  return <AdminOrdersView key={searchParamsKey} filters={filters} />;
}

export default function AdminOrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6">
          <LoadingState />
        </div>
      }
    >
      <AdminOrdersContent />
    </Suspense>
  );
}
