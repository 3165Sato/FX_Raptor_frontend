"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { PageHeader } from "@/components/common/PageHeader";
import { Header } from "@/components/layout/Header";
import { PageScaffold } from "@/components/layout/PageScaffold";

function AdminAccountsContent() {
  const searchParams = useSearchParams();
  const accountId = searchParams.get("accountId");

  return (
    <div>
      <Header title="Accounts" description="口座一覧と照会のプレースホルダーです。" />
      <main className="space-y-6 p-6">
        {accountId ? (
          <PageHeader
            title="関連遷移"
            description={`accountId=${accountId} を起点にこの画面へ遷移しました。今後は詳細画面への導線をここに追加します。`}
          />
        ) : null}
        <PageScaffold
          eyebrow="admin / accounts"
          title="Account Monitoring"
          description="口座サマリー、証拠金状況、検索 UI を今後ここに実装します。"
        />
      </main>
    </div>
  );
}

export default function AdminAccountsPage() {
  return (
    <Suspense fallback={<div className="p-6"><PageScaffold eyebrow="admin / accounts" title="Account Monitoring" description="Loading..." /></div>}>
      <AdminAccountsContent />
    </Suspense>
  );
}
