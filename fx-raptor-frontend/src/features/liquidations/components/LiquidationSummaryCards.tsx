import { MetricCard } from "@/components/common/MetricCard";
import { formatNumber } from "@/lib/formatters";

import { LiquidationLog } from "../types";

type LiquidationSummaryCardsProps = {
  items: LiquidationLog[];
};

function isToday(value: string) {
  const date = new Date(value);
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function LiquidationSummaryCards({ items }: LiquidationSummaryCardsProps) {
  const accounts = new Set(items.map((item) => item.accountId)).size;
  const pairs = new Set(items.map((item) => item.currencyPair)).size;
  const todayCount = items.filter((item) => isToday(item.createdAt)).length;

  return (
    <section className="grid gap-4 lg:grid-cols-4">
      <MetricCard label="総ロスカット件数" value={formatNumber(items.length)} hint="現在のフィルタ結果" />
      <MetricCard label="本日のロスカット" value={formatNumber(todayCount)} hint="createdAt 基準" />
      <MetricCard label="影響口座数" value={formatNumber(accounts)} hint="ユニーク accountId" />
      <MetricCard label="通貨ペア数" value={formatNumber(pairs)} hint="ユニーク currencyPair" />
    </section>
  );
}
