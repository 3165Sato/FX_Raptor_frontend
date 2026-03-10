import { Header } from "@/components/layout/Header";
import { PageScaffold } from "@/components/layout/PageScaffold";

export default function AdminAccountsPage() {
  return (
    <div>
      <Header title="Accounts" description="口座一覧と残高監視のプレースホルダーです。" />
      <main className="p-6">
        <PageScaffold eyebrow="admin / accounts" title="Account Monitoring" description="口座サマリー、証拠金状況、フィルタを今後ここに実装します。" />
      </main>
    </div>
  );
}
