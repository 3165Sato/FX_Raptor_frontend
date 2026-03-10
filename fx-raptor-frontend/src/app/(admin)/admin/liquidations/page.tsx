"use client";

import { useState } from "react";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Header } from "@/components/layout/Header";
import { LiquidationFilters } from "@/features/liquidations/components/LiquidationFilters";
import { LiquidationSummaryCards } from "@/features/liquidations/components/LiquidationSummaryCards";
import { LiquidationsTable } from "@/features/liquidations/components/LiquidationsTable";
import { useLiquidationsQuery } from "@/features/liquidations/hooks";
import {
  defaultLiquidationFilters,
  LiquidationFilters as LiquidationFilterValues,
} from "@/features/liquidations/types";

export default function AdminLiquidationsPage() {
  const [draftFilters, setDraftFilters] = useState(defaultLiquidationFilters);
  const [appliedFilters, setAppliedFilters] = useState<LiquidationFilterValues>(defaultLiquidationFilters);
  const { data, isFetching, isLoading } = useLiquidationsQuery(appliedFilters);

  const items = data?.items ?? [];

  function handleSearch() {
    setAppliedFilters(draftFilters);
  }

  function handleReset() {
    setDraftFilters(defaultLiquidationFilters);
    setAppliedFilters(defaultLiquidationFilters);
  }

  return (
    <div>
      <Header
        title="ロスカット履歴"
        description="管理者向けのロスカット履歴画面です。口座、通貨ペア、数量、維持率を確認できます。"
      />
      <main className="space-y-6 p-6">
        <LiquidationSummaryCards items={items} />

        <section className="rounded-[2rem] border border-rose-100 bg-rose-50/70 px-5 py-4 text-sm text-slate-600">
          <p className="font-medium text-slate-800">維持率の見方</p>
          <p className="mt-1">ロスカット時点の `marginRatioAtLiquidation` を % 表示しています。値が低いほど警戒度が高い想定です。</p>
        </section>

        <LiquidationFilters
          value={draftFilters}
          onChange={setDraftFilters}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">ロスカット一覧</h2>
              <p className="mt-1 text-sm text-slate-500">API 未接続時はモックデータに自動で fallback します。</p>
            </div>
            {isFetching ? <LoadingSpinner /> : null}
          </div>

          {isLoading ? (
            <div className="flex min-h-48 items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
              <h3 className="text-lg font-semibold text-slate-900">ロスカット履歴がありません</h3>
              <p className="mt-2 text-sm text-slate-500">フィルタ条件を変更するか、API 接続後に再確認してください。</p>
            </div>
          ) : (
            <LiquidationsTable items={items} />
          )}
        </section>
      </main>
    </div>
  );
}
