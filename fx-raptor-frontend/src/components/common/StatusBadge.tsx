const toneMap = {
  active: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  filled: "bg-sky-100 text-sky-700",
  warning: "bg-rose-100 text-rose-700",
  idle: "bg-slate-100 text-slate-600",
} as const;

type StatusBadgeProps = {
  label: string;
  tone?: keyof typeof toneMap;
};

export function StatusBadge({ label, tone = "idle" }: StatusBadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${toneMap[tone]}`}>
      {label}
    </span>
  );
}
