import { MetricCard } from "@/components/common/MetricCard";
import { formatNumber } from "@/lib/formatters";

import { TraderTradeView } from "../types";

type TraderTradeSummaryCardsProps = {
  trades: TraderTradeView[];
};

export function TraderTradeSummaryCards({ trades }: TraderTradeSummaryCardsProps) {
  const buyCount = trades.filter((trade) => trade.side === "BUY").length;
  const sellCount = trades.filter((trade) => trade.side === "SELL").length;
  const totalQuantity = trades.reduce((sum, trade) => sum + trade.executionQuantity, 0);

  return (
    <section className="grid gap-4 lg:grid-cols-4">
      <MetricCard label="総約定件数" value={formatNumber(trades.length)} hint="現在のフィルタ結果" />
      <MetricCard label="BUY 約定件数" value={formatNumber(buyCount)} hint="買い約定" />
      <MetricCard label="SELL 約定件数" value={formatNumber(sellCount)} hint="売り約定" />
      <MetricCard label="総約定数量" value={formatNumber(totalQuantity)} hint="executionQuantity 合計" />
    </section>
  );
}
