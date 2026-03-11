import Link from "next/link";

import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDateTime, formatNumber, formatPercent } from "@/lib/formatters";

import { LiquidationLog } from "../types";

type LiquidationsTableProps = {
  items: LiquidationLog[];
};

function getSideTone(side: LiquidationLog["side"]) {
  return side === "BUY" ? "active" : "warning";
}

function getReasonTone(reason: string) {
  switch (reason) {
    case "AUTO_CUT":
      return "warning";
    case "MARGIN_CALL_BREACH":
      return "pending";
    case "RISK_LIMIT_EXCEEDED":
      return "filled";
    default:
      return "idle";
  }
}

export function LiquidationsTable({ items }: LiquidationsTableProps) {
  return (
    <DataTable
      columns={[
        { key: "liquidationLogId", header: "liquidationLogId" },
        {
          key: "accountId",
          header: "accountId",
          render: (item) => (
            <Link href={`/admin/accounts?accountId=${encodeURIComponent(String(item.accountId))}`} className="font-medium text-cyan-700 hover:underline">
              {item.accountId}
            </Link>
          ),
        },
        { key: "orderId", header: "orderId" },
        {
          key: "tradeId",
          header: "tradeId",
          render: (item) => (item.tradeId == null ? "-" : String(item.tradeId)),
        },
        { key: "currencyPair", header: "currencyPair" },
        {
          key: "side",
          header: "side",
          render: (item) => <StatusBadge label={item.side} tone={getSideTone(item.side)} />,
        },
        { key: "quantity", header: "quantity", render: (item) => formatNumber(item.quantity) },
        {
          key: "liquidationReason",
          header: "liquidationReason",
          render: (item) => (
            <StatusBadge label={item.liquidationReason} tone={getReasonTone(item.liquidationReason)} />
          ),
        },
        {
          key: "marginRatioAtLiquidation",
          header: "維持率",
          render: (item) => (
            <span className={item.marginRatioAtLiquidation < 50 ? "font-semibold text-rose-700" : "font-semibold text-amber-700"}>
              {formatPercent(item.marginRatioAtLiquidation)}
            </span>
          ),
        },
        { key: "createdAt", header: "createdAt", render: (item) => formatDateTime(item.createdAt) },
      ]}
      rows={items}
    />
  );
}
