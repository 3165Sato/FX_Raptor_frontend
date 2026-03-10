import { Header } from "@/components/layout/Header";
import { PageScaffold } from "@/components/layout/PageScaffold";

export default function TraderAccountPage() {
  return (
    <div>
      <Header title="Account" description="口座サマリー画面のプレースホルダーです。" />
      <main className="p-6">
        <PageScaffold eyebrow="trader / account" title="Account Summary" description="残高、評価損益、余力、証拠金率をこの画面に表示します。" />
      </main>
    </div>
  );
}
