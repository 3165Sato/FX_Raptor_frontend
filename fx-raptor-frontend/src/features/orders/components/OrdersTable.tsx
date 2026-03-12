import Link from "next/link";

import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDateTime, formatNumber } from "@/lib/formatters";

import { Order } from "../types";

type OrdersTableProps = {
  orders: Order[];
};

function getStatusTone(status: string) {
  switch (status) {
    case "FILLED":
      return "filled";
    case "PENDING":
    case "PROCESSING":
    case "NEW":
      return "pending";
    case "REJECTED":
    case "CANCELLED":
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

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <DataTable
      columns={[
        {
          key: "orderId",
          header: "注文ID",
          render: (order) => (
            <Link
              href={`/admin/orders?orderId=${encodeURIComponent(String(order.orderId))}`}
              className="font-medium text-cyan-700 hover:underline"
            >
              {order.orderId}
            </Link>
          ),
        },
        {
          key: "accountId",
          header: "口座ID",
          render: (order) => (
            <Link
              href={`/admin/accounts?accountId=${encodeURIComponent(String(order.accountId))}`}
              className="font-medium text-cyan-700 hover:underline"
            >
              {order.accountId}
            </Link>
          ),
        },
        { key: "currencyPair", header: "通貨ペア" },
        {
          key: "side",
          header: "売買区分",
          render: (order) => (
            <span className={order.side === "BUY" ? "font-semibold text-emerald-700" : "font-semibold text-rose-700"}>
              {order.side}
            </span>
          ),
        },
        { key: "orderType", header: "注文種別" },
        {
          key: "quantity",
          header: "数量",
          render: (order) => formatNumber(order.quantity),
        },
        {
          key: "status",
          header: "ステータス",
          render: (order) => <StatusBadge label={order.status} tone={getStatusTone(order.status)} />,
        },
        {
          key: "sourceType",
          header: "発生元",
          render: (order) => <StatusBadge label={order.sourceType} tone={getSourceTone(order.sourceType)} />,
        },
        {
          key: "createdAt",
          header: "作成日時",
          render: (order) => formatDateTime(order.createdAt),
        },
      ]}
      rows={orders}
    />
  );
}
