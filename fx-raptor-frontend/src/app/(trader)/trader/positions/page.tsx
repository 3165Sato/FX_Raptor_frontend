"use client";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Header } from "@/components/layout/Header";
import { TraderPositionSummaryCards } from "@/features/positions/components/TraderPositionSummaryCards";
import { TraderPositionsTable } from "@/features/positions/components/TraderPositionsTable";
import { useTraderPositionsQuery } from "@/features/positions/hooks";
import { useSessionStore } from "@/stores/sessionStore";

const fallbackAccountId = "A-100";

export default function TraderPositionsPage() {
  const selectedAccountId = useSessionStore((state) => state.selectedAccountId);
  const accountId = selectedAccountId ?? fallbackAccountId;
  const { data, isLoading, isFetching } = useTraderPositionsQuery(accountId);

  const positions = data?.items ?? [];

  return (
    <div>
      <Header
        title="保有ポジション"
        description="現在保有しているポジションの数量、平均取得単価、現在価格、評価損益を確認できます。"
      />
      <main className="space-y-6 p-6">
        {isLoading ? (
          <div className="flex min-h-64 items-center justify-center rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <LoadingSpinner />
          </div>
        ) : positions.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
            <h2 className="text-lg font-semibold text-slate-900">保有ポジションがありません</h2>
            <p className="mt-2 text-sm text-slate-500">API 接続後に再確認してください。</p>
          </div>
        ) : (
          <>
            {isFetching ? (
              <div className="flex justify-end">
                <LoadingSpinner />
              </div>
            ) : null}

            <TraderPositionSummaryCards positions={positions} />

            <section className="rounded-[2rem] border border-cyan-100 bg-cyan-50/70 px-5 py-4 text-sm text-slate-600">
              <p className="font-medium text-slate-800">平均取得単価の見方</p>
              <p className="mt-1">平均取得単価と現在価格の差から、各ポジションの評価損益を確認できます。</p>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">ポジション一覧</h2>
                  <p className="mt-1 text-sm text-slate-500">保有中の通貨ペア別ポジションを表示しています。</p>
                </div>
              </div>
              <TraderPositionsTable positions={positions} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}
