import { Header } from "@/components/layout/Header";
import { PageScaffold } from "@/components/layout/PageScaffold";

export default function TraderPositionsPage() {
  return (
    <div>
      <Header title="Positions" description="保有建玉一覧のプレースホルダーです。" />
      <main className="p-6">
        <PageScaffold eyebrow="trader / positions" title="Position Book" description="保有建玉、平均価格、評価損益、決済導線を配置します。" />
      </main>
    </div>
  );
}
