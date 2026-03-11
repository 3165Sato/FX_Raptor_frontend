import { ReactNode } from "react";

type SummaryGridProps = {
  children: ReactNode;
};

export function SummaryGrid({ children }: SummaryGridProps) {
  return <section className="grid gap-4 lg:grid-cols-4">{children}</section>;
}
