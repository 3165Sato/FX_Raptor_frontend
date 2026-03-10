import { Header } from "@/components/layout/Header";
import { PageScaffold } from "@/components/layout/PageScaffold";

export default function AdminTradesPage() {
  return (
    <div>
      <Header title="Trades" description="約定履歴と約定品質確認のプレースホルダーです。" />
      <main className="p-6">
        <PageScaffold eyebrow="admin / trades" title="Trade Ledger" description="約定一覧、約定レイテンシ、価格乖離をこの画面で扱う想定です。" />
      </main>
    </div>
  );
}
