import { Header } from "@/components/layout/Header";
import { PageScaffold } from "@/components/layout/PageScaffold";

export default function AdminCoversPage() {
  return (
    <div>
      <Header title="Covers" description="カバー注文照会のプレースホルダーです。" />
      <main className="p-6">
        <PageScaffold eyebrow="admin / covers" title="Cover Execution" description="ヘッジ方針、実行状況、失敗分析を今後この画面に追加します。" />
      </main>
    </div>
  );
}
