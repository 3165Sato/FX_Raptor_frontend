import Link from "next/link";

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

function renderLinkOrFallback(value: string | number, href: string) {
  if (value === "-" || value === "") {
    return "-";
  }

  return (
    <Link href={href} className="font-medium text-cyan-700 hover:underline">
      {value}
    </Link>
  );
}

export function PositionsTable({ positions }: PositionsTableProps) {
  return (
    <DataTable
      columns={[
        {
          key: "positionId",
          header: "ポジションID",
          render: (position) =>
            renderLinkOrFallback(
              position.positionId,
              `/admin/positions?positionId=${encodeURIComponent(String(position.positionId))}`,
            ),
        },
        {
          key: "accountId",
          header: "口座ID",
          render: (position) =>
            renderLinkOrFallback(
              position.accountId,
              `/admin/accounts?accountId=${encodeURIComponent(String(position.accountId))}`,
            ),
        },
        { key: "currencyPair", header: "通貨ペア" },
        {
          key: "side",
          header: "売買区分",
          render: (position) => <StatusBadge label={position.side} tone={getSideTone(position.side)} />,
        },
        {
          key: "quantity",
          header: "数量",
          render: (position) => formatNumber(position.quantity),
        },
        {
          key: "avgPrice",
          header: "平均取得単価",
          render: (position) => formatPrice(position.avgPrice),
        },
        {
          key: "updatedAt",
          header: "更新日時",
          render: (position) => (position.updatedAt ? formatDateTime(position.updatedAt) : "-"),
        },
      ]}
      rows={positions}
    />
  );
}
