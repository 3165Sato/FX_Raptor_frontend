import { Header } from "@/components/layout/Header";
import { PageScaffold } from "@/components/layout/PageScaffold";

export default function TraderOrdersPage() {
  return (
    <div>
      <Header title="Orders" description="注文履歴一覧のプレースホルダーです。" />
      <main className="p-6">
        <PageScaffold eyebrow="trader / orders" title="Order History" description="注文状態の追跡、訂正、取消導線をこの画面に載せます。" />
      </main>
    </div>
  );
}
