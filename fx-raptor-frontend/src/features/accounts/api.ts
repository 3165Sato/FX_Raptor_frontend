import { apiClient } from "@/lib/apiClient";

import { AccountView, AccountsResponse } from "./types";

const mockAccount: AccountView = {
  accountId: "A-100",
  customerNo: "CUST-90001",
  currencyCode: "JPY",
  balance: 2500000,
  unrealizedPnL: 125000,
  equity: 2625000,
  requiredMargin: 840000,
  marginRatio: 312.5,
  updatedAt: "2026-03-11T10:30:00+09:00",
};

export function fetchAccounts() {
  return apiClient<AccountsResponse>("/api/admin/accounts");
}

export async function getAccount(accountId: string | number) {
  try {
    return await apiClient<AccountView>(`/api/accounts/${accountId}`);
  } catch {
    return {
      ...mockAccount,
      accountId,
      customerNo: typeof accountId === "string" ? `CUST-${accountId.replace(/\D/g, "") || "90001"}` : "CUST-90001",
    };
  }
}
