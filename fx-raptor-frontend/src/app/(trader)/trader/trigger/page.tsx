import { Header } from "@/components/layout/Header";
import { PageScaffold } from "@/components/layout/PageScaffold";

export default function TraderTriggerPage() {
  return (
    <div>
      <Header title="Trigger Order" description="トリガー注文設定画面のプレースホルダーです。" />
      <main className="p-6">
        <PageScaffold eyebrow="trader / trigger" title="Trigger Setup" description="トリガー条件設定、一覧、キャンセル導線をこの画面に実装します。" />
      </main>
    </div>
  );
}
