import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDateTime, formatNumber, formatPrice } from "@/lib/formatters";

import { TraderTradeView } from "../types";

type TraderTradesTableProps = {
  trades: TraderTradeView[];
};

function getSideTone(side: TraderTradeView["side"]) {
  return side === "BUY" ? "active" : "warning";
}

export function TraderTradesTable({ trades }: TraderTradesTableProps) {
  return (
    <DataTable
      columns={[
        { key: "tradeId", header: "tradeId" },
        { key: "orderId", header: "orderId" },
        { key: "currencyPair", header: "currencyPair" },
        {
          key: "side",
          header: "side",
          render: (trade) => <StatusBadge label={trade.side} tone={getSideTone(trade.side)} />,
        },
        { key: "executionPrice", header: "executionPrice", render: (trade) => formatPrice(trade.executionPrice) },
        {
          key: "executionQuantity",
          header: "executionQuantity",
          render: (trade) => formatNumber(trade.executionQuantity),
        },
        { key: "executedAt", header: "executedAt", render: (trade) => formatDateTime(trade.executedAt) },
      ]}
      rows={trades}
    />
  );
}
