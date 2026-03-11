"use client";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Header } from "@/components/layout/Header";
import { AccountDetailPanel } from "@/features/accounts/components/AccountDetailPanel";
import { AccountSummaryCards } from "@/features/accounts/components/AccountSummaryCards";
import { MarginStatusPanel } from "@/features/accounts/components/MarginStatusPanel";
import { useAccountQuery } from "@/features/accounts/hooks";
import { useSessionStore } from "@/stores/sessionStore";

const fallbackAccountId = "A-100";

export default function TraderAccountPage() {
  const selectedAccountId = useSessionStore((state) => state.selectedAccountId);
  const accountId = selectedAccountId ?? fallbackAccountId;
  const { data: account, isLoading, isFetching } = useAccountQuery(accountId);

  return (
    <div>
      <Header
        title="口座情報"
        description="残高、評価損益、有効証拠金、維持率を確認できる投資家向けの口座サマリーです。"
      />
      <main className="space-y-6 p-6">
        {isLoading ? (
          <div className="flex min-h-64 items-center justify-center rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <LoadingSpinner />
          </div>
        ) : !account ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
            <h2 className="text-lg font-semibold text-slate-900">口座情報を取得できませんでした</h2>
            <p className="mt-2 text-sm text-slate-500">API 接続後に再確認してください。</p>
          </div>
        ) : (
          <>
            {isFetching ? (
              <div className="flex justify-end">
                <LoadingSpinner />
              </div>
            ) : null}

            <AccountSummaryCards account={account} />

            <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
              <AccountDetailPanel account={account} />
              <MarginStatusPanel account={account} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}
