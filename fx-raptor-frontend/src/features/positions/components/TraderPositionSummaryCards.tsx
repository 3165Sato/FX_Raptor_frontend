import { MetricCard } from "@/components/common/MetricCard";
import { formatCurrency, formatNumber } from "@/lib/formatters";

import { TraderPositionView } from "../types";

type TraderPositionSummaryCardsProps = {
  positions: TraderPositionView[];
  currencyCode?: string;
};

export function TraderPositionSummaryCards({
  positions,
  currencyCode = "JPY",
}: TraderPositionSummaryCardsProps) {
  const buyCount = positions.filter((position) => position.side === "BUY").length;
  const sellCount = positions.filter((position) => position.side === "SELL").length;
  const totalPnL = positions.reduce((sum, position) => sum + position.unrealizedPnL, 0);

  return (
    <section className="grid gap-4 lg:grid-cols-4">
      <MetricCard label="総ポジション件数" value={formatNumber(positions.length)} hint="現在保有中" />
      <MetricCard label="BUY ポジション" value={formatNumber(buyCount)} hint="買い建玉件数" />
      <MetricCard label="SELL ポジション" value={formatNumber(sellCount)} hint="売り建玉件数" />
      <MetricCard label="総評価損益" value={formatCurrency(totalPnL, currencyCode)} hint="unrealizedPnL 合計" />
    </section>
  );
}
