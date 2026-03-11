import { StatusBadge } from "@/components/common/StatusBadge";
import { formatCurrency, formatPercent } from "@/lib/formatters";

import { AccountView } from "../types";

type MarginStatusPanelProps = {
  account: AccountView;
};

function getMarginTone(marginRatio: number) {
  if (marginRatio >= 200) {
    return { tone: "active" as const, label: "安全" };
  }

  if (marginRatio >= 120) {
    return { tone: "pending" as const, label: "注意" };
  }

  return { tone: "warning" as const, label: "危険" };
}

export function MarginStatusPanel({ account }: MarginStatusPanelProps) {
  const marginStatus = getMarginTone(account.marginRatio);

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900">証拠金状況</h2>
        <StatusBadge label={marginStatus.label} tone={marginStatus.tone} />
      </div>

      <div className="mt-5 space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">必要証拠金</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {formatCurrency(account.requiredMargin, account.currencyCode)}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">維持率</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{formatPercent(account.marginRatio)}</p>
        </div>
        <div className="rounded-2xl border border-dashed border-amber-200 bg-amber-50 p-4 text-sm text-slate-600">
          <p className="font-medium text-slate-800">ロスカット閾値の目安</p>
          <p className="mt-1">維持率が 100% を下回る付近ではロスカット対象として扱う想定です。</p>
        </div>
      </div>
    </section>
  );
}
