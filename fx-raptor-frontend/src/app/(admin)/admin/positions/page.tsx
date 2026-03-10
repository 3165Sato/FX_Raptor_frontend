"use client";

import { useState } from "react";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Header } from "@/components/layout/Header";
import { PositionFilters } from "@/features/positions/components/PositionFilters";
import { PositionSummaryCards } from "@/features/positions/components/PositionSummaryCards";
import { PositionsTable } from "@/features/positions/components/PositionsTable";
import { usePositionsQuery } from "@/features/positions/hooks";
import {
  defaultPositionFilters,
  PositionFilters as PositionFilterValues,
} from "@/features/positions/types";

export default function AdminPositionsPage() {
  const [draftFilters, setDraftFilters] = useState(defaultPositionFilters);
  const [appliedFilters, setAppliedFilters] = useState<PositionFilterValues>(defaultPositionFilters);
  const { data, isFetching, isLoading } = usePositionsQuery(appliedFilters);

  const positions = data?.items ?? [];

  function handleSearch() {
    setAppliedFilters(draftFilters);
  }

  function handleReset() {
    setDraftFilters(defaultPositionFilters);
    setAppliedFilters(defaultPositionFilters);
  }

  return (
    <div>
      <Header
        title="ポジション一覧"
        description="管理者向けの建玉照会画面です。数量と平均取得単価を中心に現在の保有状況を確認できます。"
      />
      <main className="space-y-6 p-6">
        <PositionSummaryCards positions={positions} />

        <section className="rounded-[2rem] border border-cyan-100 bg-cyan-50/70 px-5 py-4 text-sm text-slate-600">
          <p className="font-medium text-slate-800">平均取得単価</p>
          <p className="mt-1">同一ポジションに対する約定価格の加重平均として表示する想定です。</p>
        </section>

        <PositionFilters
          value={draftFilters}
          onChange={setDraftFilters}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">ポジションテーブル</h2>
              <p className="mt-1 text-sm text-slate-500">API 未接続時はモックデータに自動で fallback します。</p>
            </div>
            {isFetching ? <LoadingSpinner /> : null}
          </div>

          {isLoading ? (
            <div className="flex min-h-48 items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : positions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
              <h3 className="text-lg font-semibold text-slate-900">ポジションがありません</h3>
              <p className="mt-2 text-sm text-slate-500">フィルタ条件を変更するか、API 接続後に再確認してください。</p>
            </div>
          ) : (
            <PositionsTable positions={positions} />
          )}
        </section>
      </main>
    </div>
  );
}
