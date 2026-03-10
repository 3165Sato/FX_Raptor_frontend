import { Header } from "@/components/layout/Header";
import { PageScaffold } from "@/components/layout/PageScaffold";

export default function AdminOrdersPage() {
  return (
    <div>
      <Header title="Orders" description="注文一覧と執行状況のプレースホルダーです。" />
      <main className="p-6">
        <PageScaffold eyebrow="admin / orders" title="Order Surveillance" description="注文検索、状態別集計、異常検知をこの画面に追加していきます。" />
      </main>
    </div>
  );
}
