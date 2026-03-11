import Link from "next/link";

import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDateTime, formatNumber } from "@/lib/formatters";

import { TraderOrderView } from "../types";

type TraderOrdersTableProps = {
  orders: TraderOrderView[];
};

function getStatusTone(status: string) {
  switch (status) {
    case "FILLED":
      return "filled";
    case "NEW":
    case "PROCESSING":
      return "pending";
    case "CANCELLED":
    case "REJECTED":
      return "warning";
    default:
      return "idle";
  }
}

function getSourceTone(sourceType: string) {
  switch (sourceType) {
    case "USER":
      return "active";
    case "TRIGGER":
      return "pending";
    case "LIQUIDATION":
      return "warning";
    default:
      return "idle";
  }
}

export function TraderOrdersTable({ orders }: TraderOrdersTableProps) {
  return (
    <DataTable
      columns={[
        {
          key: "orderId",
          header: "orderId",
          render: (order) => (
            <Link
              href={`/trader/trades?orderId=${encodeURIComponent(String(order.orderId))}`}
              className="font-medium text-cyan-700 hover:underline"
            >
              {order.orderId}
            </Link>
          ),
        },
        { key: "currencyPair", header: "currencyPair" },
        {
          key: "side",
          header: "side",
          render: (order) => (
            <span className={order.side === "BUY" ? "font-semibold text-emerald-700" : "font-semibold text-rose-700"}>
              {order.side}
            </span>
          ),
        },
        { key: "orderType", header: "orderType" },
        { key: "quantity", header: "quantity", render: (order) => formatNumber(order.quantity) },
        {
          key: "status",
          header: "status",
          render: (order) => <StatusBadge label={order.status} tone={getStatusTone(order.status)} />,
        },
        {
          key: "sourceType",
          header: "sourceType",
          render: (order) => <StatusBadge label={order.sourceType} tone={getSourceTone(order.sourceType)} />,
        },
        { key: "createdAt", header: "createdAt", render: (order) => formatDateTime(order.createdAt) },
      ]}
      rows={orders}
    />
  );
}
