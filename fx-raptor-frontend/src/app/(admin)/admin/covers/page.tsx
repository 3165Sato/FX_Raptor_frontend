"use client";

import { useState } from "react";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Header } from "@/components/layout/Header";
import { CoverFilters } from "@/features/covers/components/CoverFilters";
import { CoverSummaryCards } from "@/features/covers/components/CoverSummaryCards";
import { CoversTable } from "@/features/covers/components/CoversTable";
import { useCoversQuery } from "@/features/covers/hooks";
import { CoverFilters as CoverFilterValues, defaultCoverFilters } from "@/features/covers/types";

export default function AdminCoversPage() {
  const [draftFilters, setDraftFilters] = useState(defaultCoverFilters);
  const [appliedFilters, setAppliedFilters] = useState<CoverFilterValues>(defaultCoverFilters);
  const { data, isFetching, isLoading } = useCoversQuery(appliedFilters);

  const items = data?.items ?? [];

  function handleSearch() {
    setAppliedFilters(draftFilters);
  }

  function handleReset() {
    setDraftFilters(defaultCoverFilters);
    setAppliedFilters(defaultCoverFilters);
  }

  return (
    <div>
      <Header
        title="カバー取引一覧"
        description="管理者向けのカバー注文・カバー約定履歴画面です。顧客取引の裏側でどのようにヘッジしたかを確認できます。"
      />
      <main className="space-y-6 p-6">
        <CoverSummaryCards items={items} />

        <section className="rounded-[2rem] border border-cyan-100 bg-cyan-50/70 px-5 py-4 text-sm text-slate-600">
          <p className="font-medium text-slate-800">カバー確認ポイント</p>
          <p className="mt-1">requestedPrice と executedPrice、status、executionResult を並べて事業者側の執行状況を確認できます。</p>
        </section>

        <CoverFilters
          value={draftFilters}
          onChange={setDraftFilters}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">カバー一覧</h2>
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
              <h3 className="text-lg font-semibold text-slate-900">カバー取引がありません</h3>
              <p className="mt-2 text-sm text-slate-500">フィルタ条件を変更するか、API 接続後に再確認してください。</p>
            </div>
          ) : (
            <CoversTable items={items} />
          )}
        </section>
      </main>
    </div>
  );
}
