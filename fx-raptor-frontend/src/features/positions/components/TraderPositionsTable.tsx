import { StatusBadge } from "@/components/common/StatusBadge";
import { DataTable } from "@/components/common/DataTable";
import { formatCurrency, formatDateTime, formatNumber, formatPrice } from "@/lib/formatters";

import { TraderPositionView } from "../types";

type TraderPositionsTableProps = {
  positions: TraderPositionView[];
  currencyCode?: string;
};

function getSideTone(side: TraderPositionView["side"]) {
  return side === "BUY" ? "active" : "warning";
}

export function TraderPositionsTable({
  positions,
  currencyCode = "JPY",
}: TraderPositionsTableProps) {
  return (
    <DataTable
      columns={[
        { key: "positionId", header: "positionId" },
        { key: "currencyPair", header: "currencyPair" },
        {
          key: "side",
          header: "side",
          render: (position) => <StatusBadge label={position.side} tone={getSideTone(position.side)} />,
        },
        { key: "quantity", header: "quantity", render: (position) => formatNumber(position.quantity) },
        { key: "avgPrice", header: "平均取得単価", render: (position) => formatPrice(position.avgPrice) },
        { key: "currentPrice", header: "現在価格", render: (position) => formatPrice(position.currentPrice) },
        {
          key: "unrealizedPnL",
          header: "評価損益",
          render: (position) => (
            <span className={position.unrealizedPnL >= 0 ? "font-semibold text-emerald-700" : "font-semibold text-rose-700"}>
              {formatCurrency(position.unrealizedPnL, currencyCode)}
            </span>
          ),
        },
        {
          key: "updatedAt",
          header: "updatedAt",
          render: (position) => (position.updatedAt ? formatDateTime(position.updatedAt) : "-"),
        },
      ]}
      rows={positions}
    />
  );
}
