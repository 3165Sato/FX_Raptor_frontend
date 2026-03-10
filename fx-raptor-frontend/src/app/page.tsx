import Link from "next/link";

const destinations = [
  {
    href: "/admin",
    title: "Admin Console",
    description: "口座、注文、建玉、カバー、ロスカットを横断して監視する管理者向け画面。",
  },
  {
    href: "/trader",
    title: "Trader Console",
    description: "発注、トリガー、口座状況を確認する投資家向け画面。",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,116,144,0.16),_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">FX Raptor Demo</p>
          <h1 className="mt-4 max-w-2xl text-5xl font-semibold tracking-tight text-slate-950">
            App Router ベースの管理者 / 投資家フロントエンド骨格
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            REST API を前提にした共通レイアウト、状態管理、Query 基盤を用意しています。
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {destinations.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Console</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              <span className="mt-8 inline-flex text-sm font-medium text-cyan-700">Open workspace</span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
