import Link from "next/link";

import { DataTable } from "@/components/common/DataTable";
import { formatDateTime, formatNumber, formatPrice } from "@/lib/formatters";

import { Trade } from "../types";

type TradesTableProps = {
  trades: Trade[];
};

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

export function TradesTable({ trades }: TradesTableProps) {
  return (
    <DataTable
      columns={[
        {
          key: "tradeId",
          header: "約定ID",
          render: (trade) =>
            renderLinkOrFallback(
              trade.tradeId,
              `/admin/trades?tradeId=${encodeURIComponent(String(trade.tradeId))}`,
            ),
        },
        {
          key: "orderId",
          header: "注文ID",
          render: (trade) =>
            renderLinkOrFallback(
              trade.orderId,
              `/admin/orders?orderId=${encodeURIComponent(String(trade.orderId))}`,
            ),
        },
        {
          key: "accountId",
          header: "口座ID",
          render: (trade) =>
            renderLinkOrFallback(
              trade.accountId,
              `/admin/accounts?accountId=${encodeURIComponent(String(trade.accountId))}`,
            ),
        },
        { key: "currencyPair", header: "通貨ペア" },
        {
          key: "side",
          header: "売買区分",
          render: (trade) => (
            <span className={trade.side === "BUY" ? "font-semibold text-emerald-700" : "font-semibold text-rose-700"}>
              {trade.side}
            </span>
          ),
        },
        {
          key: "executionPrice",
          header: "約定価格",
          render: (trade) => formatPrice(trade.executionPrice),
        },
        {
          key: "executionQuantity",
          header: "約定数量",
          render: (trade) => formatNumber(trade.executionQuantity),
        },
        {
          key: "executedAt",
          header: "約定日時",
          render: (trade) => (trade.executedAt ? formatDateTime(trade.executedAt) : "-"),
        },
      ]}
      rows={trades}
    />
  );
}
