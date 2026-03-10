import { DataTable } from "@/components/common/DataTable";
import { formatDateTime, formatNumber, formatPrice } from "@/lib/formatters";

import { Trade } from "../types";

type TradesTableProps = {
  trades: Trade[];
};

export function TradesTable({ trades }: TradesTableProps) {
  return (
    <DataTable
      columns={[
        { key: "tradeId", header: "約定ID" },
        { key: "orderId", header: "注文ID" },
        { key: "accountId", header: "口座ID" },
        { key: "currencyPair", header: "通貨ペア" },
        {
          key: "side",
          header: "売買",
          render: (trade) => (
            <span className={trade.side === "BUY" ? "font-semibold text-emerald-700" : "font-semibold text-rose-700"}>
              {trade.side}
            </span>
          ),
        },
        { key: "executionPrice", header: "約定価格", render: (trade) => formatPrice(trade.executionPrice) },
        { key: "executionQuantity", header: "約定数量", render: (trade) => formatNumber(trade.executionQuantity) },
        { key: "executedAt", header: "約定日時", render: (trade) => formatDateTime(trade.executedAt) },
      ]}
      rows={trades}
    />
  );
}
