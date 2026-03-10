import { Header } from "@/components/layout/Header";
import { PageScaffold } from "@/components/layout/PageScaffold";

export default function AdminTriggersPage() {
  return (
    <div>
      <Header title="Triggers" description="トリガー注文監視のプレースホルダーです。" />
      <main className="p-6">
        <PageScaffold eyebrow="admin / triggers" title="Trigger Watch" description="待機中トリガー、発火履歴、発火条件の可視化を想定しています。" />
      </main>
    </div>
  );
}
