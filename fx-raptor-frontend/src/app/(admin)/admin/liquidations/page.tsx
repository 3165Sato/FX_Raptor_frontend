import { Header } from "@/components/layout/Header";
import { PageScaffold } from "@/components/layout/PageScaffold";

export default function AdminLiquidationsPage() {
  return (
    <div>
      <Header title="Liquidations" description="ロスカット執行履歴のプレースホルダーです。" />
      <main className="p-6">
        <PageScaffold eyebrow="admin / liquidations" title="Liquidation Audit" description="ロスカット判定、執行結果、再発防止の分析をここで扱います。" />
      </main>
    </div>
  );
}
