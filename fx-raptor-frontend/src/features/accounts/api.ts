import { apiClient } from "@/lib/apiClient";

import { AccountsResponse } from "./types";

export function fetchAccounts() {
  return apiClient<AccountsResponse>("/api/admin/accounts");
}
