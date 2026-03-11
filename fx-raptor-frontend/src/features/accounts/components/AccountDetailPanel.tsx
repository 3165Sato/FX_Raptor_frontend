import { formatDateTime } from "@/lib/formatters";

import { AccountView } from "../types";

type AccountDetailPanelProps = {
  account: AccountView;
};

export function AccountDetailPanel({ account }: AccountDetailPanelProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">口座詳細</h2>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <dt className="text-sm text-slate-500">accountId</dt>
          <dd className="mt-1 font-semibold text-slate-900">{account.accountId}</dd>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <dt className="text-sm text-slate-500">customerNo</dt>
          <dd className="mt-1 font-semibold text-slate-900">{account.customerNo ?? "-"}</dd>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <dt className="text-sm text-slate-500">currencyCode</dt>
          <dd className="mt-1 font-semibold text-slate-900">{account.currencyCode}</dd>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <dt className="text-sm text-slate-500">更新日時</dt>
          <dd className="mt-1 font-semibold text-slate-900">
            {account.updatedAt ? formatDateTime(account.updatedAt) : "-"}
          </dd>
        </div>
      </dl>
    </section>
  );
}
