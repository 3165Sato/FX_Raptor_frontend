import { Header } from "@/components/layout/Header";
import { PageScaffold } from "@/components/layout/PageScaffold";

export default function TraderPage() {
  return (
    <div>
      <Header title="Trader Overview" description="投資家向けトップページのプレースホルダーです。" />
      <main className="p-6">
        <PageScaffold eyebrow="trader" title="Trading Workspace" description="発注、トリガー、口座状況への主要導線をまとめたホームです。" />
      </main>
    </div>
  );
}
