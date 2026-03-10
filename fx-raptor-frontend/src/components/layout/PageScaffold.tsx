import { DataTable } from "@/components/common/DataTable";
import { MetricCard } from "@/components/common/MetricCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { TableColumn } from "@/types/common";

type PageScaffoldProps = {
  eyebrow: string;
  title: string;
  description: string;
};

type SampleRow = {
  name: string;
  status: string;
  exposure: number;
  updatedAt: string;
};

const metrics = [
  { label: "Accounts", value: formatNumber(128), hint: "active portfolios" },
  { label: "Open Orders", value: formatNumber(42), hint: "pending execution" },
  { label: "Net Exposure", value: formatCurrency(1852400), hint: "mark-to-market" },
];

const rows: SampleRow[] = [
  { name: "USD/JPY Core", status: "active", exposure: 820000, updatedAt: "2026-03-10 16:20" },
  { name: "EUR/JPY Swing", status: "pending", exposure: 240000, updatedAt: "2026-03-10 16:18" },
  { name: "GBP/JPY Trigger", status: "warning", exposure: 1260000, updatedAt: "2026-03-10 16:12" },
];

const columns: TableColumn<SampleRow>[] = [
  { key: "name", header: "Name" },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge label={row.status} tone={row.status as "active" | "pending" | "warning"} />,
  },
  { key: "exposure", header: "Exposure", render: (row) => formatCurrency(row.exposure) },
  { key: "updatedAt", header: "Updated" },
];

export function PageScaffold({ eyebrow, title, description }: PageScaffoldProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Placeholder Table</h3>
            <p className="text-sm text-slate-500">バックエンド接続前の仮データです。</p>
          </div>
          <StatusBadge label="mock data" tone="idle" />
        </div>
        <DataTable columns={columns} rows={rows} />
      </section>
    </div>
  );
}
