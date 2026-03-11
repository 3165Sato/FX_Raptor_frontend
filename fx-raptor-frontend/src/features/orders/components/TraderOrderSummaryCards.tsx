import { MetricCard } from "@/components/common/MetricCard";
import { formatNumber } from "@/lib/formatters";

import { TraderOrderView } from "../types";

type TraderOrderSummaryCardsProps = {
  orders: TraderOrderView[];
};

export function TraderOrderSummaryCards({ orders }: TraderOrderSummaryCardsProps) {
  const filledCount = orders.filter((order) => order.status === "FILLED").length;
  const newCount = orders.filter((order) => order.status === "NEW").length;
  const triggerCount = orders.filter((order) => order.sourceType === "TRIGGER").length;

  return (
    <section className="grid gap-4 lg:grid-cols-4">
      <MetricCard label="総注文件数" value={formatNumber(orders.length)} hint="現在のフィルタ結果" />
      <MetricCard label="FILLED 件数" value={formatNumber(filledCount)} hint="約定済み注文" />
      <MetricCard label="NEW 件数" value={formatNumber(newCount)} hint="新規受付中" />
      <MetricCard label="TRIGGER 由来件数" value={formatNumber(triggerCount)} hint="sourceType = TRIGGER" />
    </section>
  );
}
