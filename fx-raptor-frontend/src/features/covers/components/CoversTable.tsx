import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDateTime, formatNumber, formatPrice } from "@/lib/formatters";

import { Cover } from "../types";

type CoversTableProps = {
  items: Cover[];
};

function getStatusTone(status: string) {
  switch (status) {
    case "FILLED":
      return "filled";
    case "PENDING":
      return "pending";
    case "FAILED":
      return "warning";
    default:
      return "idle";
  }
}

function getModeTone(mode: string) {
  switch (mode) {
    case "FULL":
      return "active";
    case "THRESHOLD":
      return "pending";
    default:
      return "idle";
  }
}

function getResultTone(result: string | null | undefined) {
  switch (result) {
    case "SUCCESS":
      return "filled";
    case "WAITING":
      return "pending";
    case "REJECTED":
      return "warning";
    default:
      return "idle";
  }
}

export function CoversTable({ items }: CoversTableProps) {
  return (
    <DataTable
      columns={[
        { key: "coverOrderId", header: "coverOrderId" },
        { key: "tradeId", header: "tradeId" },
        { key: "accountId", header: "accountId" },
        { key: "currencyPair", header: "currencyPair" },
        {
          key: "side",
          header: "side",
          render: (item) => (
            <span className={item.side === "BUY" ? "font-semibold text-emerald-700" : "font-semibold text-rose-700"}>
              {item.side}
            </span>
          ),
        },
        { key: "quantity", header: "quantity", render: (item) => formatNumber(item.quantity) },
        { key: "requestedPrice", header: "requestedPrice", render: (item) => formatPrice(item.requestedPrice) },
        {
          key: "status",
          header: "status",
          render: (item) => <StatusBadge label={item.status} tone={getStatusTone(item.status)} />,
        },
        {
          key: "coverMode",
          header: "coverMode",
          render: (item) => <StatusBadge label={item.coverMode} tone={getModeTone(item.coverMode)} />,
        },
        {
          key: "executedPrice",
          header: "executedPrice",
          render: (item) => (item.executedPrice == null ? "-" : formatPrice(item.executedPrice)),
        },
        {
          key: "executedQuantity",
          header: "executedQuantity",
          render: (item) => (item.executedQuantity == null ? "-" : formatNumber(item.executedQuantity)),
        },
        {
          key: "executionResult",
          header: "executionResult",
          render: (item) => (
            <StatusBadge label={item.executionResult ?? "-"} tone={getResultTone(item.executionResult)} />
          ),
        },
        {
          key: "executedAt",
          header: "executedAt",
          render: (item) => (item.executedAt == null ? "-" : formatDateTime(item.executedAt)),
        },
      ]}
      rows={items}
    />
  );
}
