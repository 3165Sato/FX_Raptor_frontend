import { formatDateTime } from "@/lib/formatters";

import { TriggerOrderResponse } from "../types";

type TriggerSubmitResultProps = {
  result?: TriggerOrderResponse | null;
  errorMessage?: string | null;
};

export function TriggerSubmitResult({ result, errorMessage }: TriggerSubmitResultProps) {
  if (errorMessage) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        Trigger 注文の登録に失敗しました: {errorMessage}
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
      <p className="font-medium">Trigger 注文を受け付けました</p>
      <p className="mt-1">Trigger ID: {result.triggerOrderId}</p>
      <p className="mt-1">Status: {result.status}</p>
      <p className="mt-1">{result.message}</p>
      <p className="mt-1 text-emerald-700/80">{formatDateTime(result.createdAt)}</p>
    </div>
  );
}
