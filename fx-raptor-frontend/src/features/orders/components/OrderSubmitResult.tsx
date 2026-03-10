import { formatDateTime } from "@/lib/formatters";

import { MarketOrderResponse } from "../types";

type OrderSubmitResultProps = {
  result?: MarketOrderResponse | null;
  errorMessage?: string | null;
};

export function OrderSubmitResult({ result, errorMessage }: OrderSubmitResultProps) {
  if (errorMessage) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        注文送信に失敗しました: {errorMessage}
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
      <p className="font-medium">注文を受け付けました</p>
      <p className="mt-1">Order ID: {result.orderId}</p>
      <p className="mt-1">Status: {result.status}</p>
      <p className="mt-1">{result.message}</p>
      <p className="mt-1 text-emerald-700/80">{formatDateTime(result.acceptedAt)}</p>
    </div>
  );
}
