import { MetricCard } from "@/components/common/MetricCard";
import { formatNumber } from "@/lib/formatters";

import { Cover } from "../types";

type CoverSummaryCardsProps = {
  items: Cover[];
};

export function CoverSummaryCards({ items }: CoverSummaryCardsProps) {
  const filledCount = items.filter((item) => item.status === "FILLED").length;
  const failedCount = items.filter((item) => item.status === "FAILED").length;
  const pairCount = new Set(items.map((item) => item.currencyPair)).size;

  return (
    <section className="grid gap-4 lg:grid-cols-4">
      <MetricCard label="総カバー件数" value={formatNumber(items.length)} hint="現在のフィルタ結果" />
      <MetricCard label="FILLED 件数" value={formatNumber(filledCount)} hint="約定済みカバー" />
      <MetricCard label="FAILED 件数" value={formatNumber(failedCount)} hint="失敗したカバー" />
      <MetricCard label="通貨ペア数" value={formatNumber(pairCount)} hint="ユニーク currencyPair" />
    </section>
  );
}
