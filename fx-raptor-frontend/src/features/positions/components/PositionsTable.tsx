import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDateTime, formatNumber, formatPrice } from "@/lib/formatters";

import { Position } from "../types";

type PositionsTableProps = {
  positions: Position[];
};

function getSideTone(side: Position["side"]) {
  return side === "BUY" ? "active" : "warning";
}

export function PositionsTable({ positions }: PositionsTableProps) {
  return (
    <DataTable
      columns={[
        { key: "positionId", header: "ポジションID" },
        { key: "accountId", header: "口座ID" },
        { key: "currencyPair", header: "通貨ペア" },
        {
          key: "side",
          header: "売買",
          render: (position) => <StatusBadge label={position.side} tone={getSideTone(position.side)} />,
        },
        { key: "quantity", header: "数量", render: (position) => formatNumber(position.quantity) },
        { key: "avgPrice", header: "平均取得単価", render: (position) => formatPrice(position.avgPrice) },
        { key: "updatedAt", header: "更新日時", render: (position) => formatDateTime(position.updatedAt) },
      ]}
      rows={positions}
    />
  );
}
