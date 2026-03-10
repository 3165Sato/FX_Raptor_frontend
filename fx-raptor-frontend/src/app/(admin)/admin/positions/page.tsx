import { Header } from "@/components/layout/Header";
import { PageScaffold } from "@/components/layout/PageScaffold";

export default function AdminPositionsPage() {
  return (
    <div>
      <Header title="Positions" description="建玉管理とエクスポージャ監視のプレースホルダーです。" />
      <main className="p-6">
        <PageScaffold eyebrow="admin / positions" title="Exposure Monitor" description="通貨ペア別・口座別の建玉集計をこの画面に実装します。" />
      </main>
    </div>
  );
}
