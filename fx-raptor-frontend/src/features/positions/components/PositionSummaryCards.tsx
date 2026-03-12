import { MetricCard } from "@/components/common/MetricCard";
import { formatNumber } from "@/lib/formatters";

import { Position } from "../types";

type PositionSummaryCardsProps = {
  positions: Position[];
};

export function PositionSummaryCards({ positions }: PositionSummaryCardsProps) {
  const buyCount = positions.filter((position) => position.side === "BUY").length;
  const sellCount = positions.filter((position) => position.side === "SELL").length;
  const pairCount = new Set(positions.map((position) => position.currencyPair)).size;

  return (
    <section className="grid gap-4 lg:grid-cols-4">
      <MetricCard label="総ポジション件数" value={formatNumber(positions.length)} hint="取得したポジション件数" />
      <MetricCard label="BUY件数" value={formatNumber(buyCount)} hint="買いポジション" />
      <MetricCard label="SELL件数" value={formatNumber(sellCount)} hint="売りポジション" />
      <MetricCard label="通貨ペア数" value={formatNumber(pairCount)} hint="ユニーク通貨ペア数" />
    </section>
  );
}
