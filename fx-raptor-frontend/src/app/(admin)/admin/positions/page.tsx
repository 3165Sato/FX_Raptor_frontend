"use client";

import { Suspense, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { EmptyState } from "@/components/common/EmptyState";
import { LoadingState } from "@/components/common/LoadingState";
import { Header } from "@/components/layout/Header";
import { PositionFilters } from "@/features/positions/components/PositionFilters";
import { PositionSummaryCards } from "@/features/positions/components/PositionSummaryCards";
import { PositionsTable } from "@/features/positions/components/PositionsTable";
import { useAdminPositionsQuery } from "@/features/positions/hooks";
import {
  defaultPositionFilters,
  PositionFilters as PositionFilterValues,
} from "@/features/positions/types";
import { ApiError } from "@/lib/apiClient";

function readFilters(searchParams: URLSearchParams): PositionFilterValues {
  return {
    accountId: searchParams.get("accountId") ?? "",
    currencyPair: searchParams.get("currencyPair") ?? "",
    side: searchParams.get("side") ?? "",
  };
}

function toQuery(filters: PositionFilterValues) {
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

  return error.message || "ポジション一覧の取得に失敗しました。";
}

type AdminPositionsViewProps = {
  filters: PositionFilterValues;
};

function AdminPositionsView({ filters }: AdminPositionsViewProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [draftFilters, setDraftFilters] = useState<PositionFilterValues>(filters);
  const { data, isFetching, isLoading, isError, error } = useAdminPositionsQuery(filters);

  const positions = data?.items ?? [];

  function handleSearch() {
    const query = toQuery(draftFilters);
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  function handleReset() {
    setDraftFilters(defaultPositionFilters);
    router.push(pathname);
  }

  return (
    <div>
      <Header
        title="ポジション一覧"
        description="Spring Boot の GET /admin/positions からポジション一覧を取得して表示します。"
      />
      <main className="space-y-6 p-6">
        <PositionSummaryCards positions={positions} />

        <section className="rounded-[2rem] border border-cyan-100 bg-cyan-50/70 px-5 py-4 text-sm text-slate-600">
          <p className="font-medium text-slate-800">平均取得単価</p>
          <p className="mt-1">各ポジションに対する平均取得価格を表示しています。</p>
        </section>

        <PositionFilters
          value={draftFilters}
          onChange={setDraftFilters}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <EmptyState title="ポジション一覧を取得できませんでした" description={getErrorDescription(error)} />
        ) : positions.length === 0 ? (
          <EmptyState
            title="ポジションデータがありません"
            description="フィルタ条件を見直すか、Spring Boot 側の /admin/positions レスポンスを確認してください。"
          />
        ) : (
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">ポジションテーブル</h2>
                <p className="mt-1 text-sm text-slate-500">accountId から口座一覧へ移動できます。</p>
              </div>
              {isFetching ? <div className="text-sm text-slate-500">更新中...</div> : null}
            </div>
            <PositionsTable positions={positions} />
          </section>
        )}
      </main>
    </div>
  );
}

function AdminPositionsContent() {
  const searchParams = useSearchParams();
  const searchParamsKey = searchParams.toString();
  const filters = readFilters(searchParams);

  return <AdminPositionsView key={searchParamsKey} filters={filters} />;
}

export default function AdminPositionsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6">
          <LoadingState />
        </div>
      }
    >
      <AdminPositionsContent />
    </Suspense>
  );
}
