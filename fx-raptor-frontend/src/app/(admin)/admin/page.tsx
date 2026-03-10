import { Header } from "@/components/layout/Header";
import { PageScaffold } from "@/components/layout/PageScaffold";

export default function AdminPage() {
  return (
    <div>
      <Header title="Admin Overview" description="監視対象を横断して確認する管理者向けトップページです。" />
      <main className="p-6">
        <PageScaffold eyebrow="admin" title="Operations Dashboard" description="口座、注文、建玉、トリガー、カバー、ロスカット監視の入り口です。" />
      </main>
    </div>
  );
}
