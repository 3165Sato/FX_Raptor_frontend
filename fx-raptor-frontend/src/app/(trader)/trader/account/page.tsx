"use client";

import Link from "next/link";

import { EmptyState } from "@/components/common/EmptyState";
import { LoadingState } from "@/components/common/LoadingState";
import { PageHeader } from "@/components/common/PageHeader";
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
          <LoadingState minHeightClassName="min-h-64" />
        ) : !account ? (
          <EmptyState title="口座情報を取得できませんでした" description="API 接続後に再確認してください。" />
        ) : (
          <>
            {isFetching ? <div className="flex justify-end text-sm text-slate-500">Updating...</div> : null}

            <PageHeader
              title="関連画面"
              description="口座状態から保有ポジション、注文履歴、約定履歴へそのまま移動できます。"
              actions={
                <>
                  <Link href="/trader/positions" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
                    Positions
                  </Link>
                  <Link href="/trader/orders" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
                    Orders
                  </Link>
                  <Link href="/trader/trades" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
                    Trades
                  </Link>
                </>
              }
            />

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
