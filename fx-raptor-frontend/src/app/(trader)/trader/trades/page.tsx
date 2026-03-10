import { Header } from "@/components/layout/Header";
import { PageScaffold } from "@/components/layout/PageScaffold";

export default function TraderTradesPage() {
  return (
    <div>
      <Header title="Trades" description="約定履歴一覧のプレースホルダーです。" />
      <main className="p-6">
        <PageScaffold eyebrow="trader / trades" title="Execution History" description="約定明細、約定価格、損益サマリーをこの画面に展開します。" />
      </main>
    </div>
  );
}
