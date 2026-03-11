import { MetricCard } from "@/components/common/MetricCard";
import { formatCurrency, formatPercent } from "@/lib/formatters";

import { AccountView } from "../types";

type AccountSummaryCardsProps = {
  account: AccountView;
};

export function AccountSummaryCards({ account }: AccountSummaryCardsProps) {
  const pnlColor = account.unrealizedPnL >= 0 ? "text-emerald-700" : "text-rose-700";

  return (
    <section className="grid gap-4 lg:grid-cols-4">
      <MetricCard label="残高" value={formatCurrency(account.balance, account.currencyCode)} hint="balance" />
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">評価損益</p>
        <p className={`mt-3 text-3xl font-semibold ${pnlColor}`}>
          {formatCurrency(account.unrealizedPnL, account.currencyCode)}
        </p>
        <p className="mt-2 text-xs text-slate-400">unrealizedPnL</p>
      </section>
      <MetricCard label="有効証拠金" value={formatCurrency(account.equity, account.currencyCode)} hint="equity" />
      <MetricCard label="維持率" value={formatPercent(account.marginRatio)} hint="marginRatio" />
    </section>
  );
}
