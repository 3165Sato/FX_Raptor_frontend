import { Header } from "@/components/layout/Header";
import { PageScaffold } from "@/components/layout/PageScaffold";

export default function TraderOrderPage() {
  return (
    <div>
      <Header title="Order Entry" description="成行注文入力画面のプレースホルダーです。" />
      <main className="p-6">
        <PageScaffold eyebrow="trader / order" title="Manual Order Form" description="通貨ペア、売買、数量、確認フローをここに実装します。" />
      </main>
    </div>
  );
}
