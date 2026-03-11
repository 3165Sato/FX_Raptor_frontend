import { ReactNode } from "react";

type FilterBarProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function FilterBar({ title, description, children }: FilterBarProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
