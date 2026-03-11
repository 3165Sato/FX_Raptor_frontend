import { useQuery } from "@tanstack/react-query";

import { fetchAccounts, getAccount } from "./api";

export function useAccounts() {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });
}

export function useAccountQuery(accountId: string | number) {
  return useQuery({
    queryKey: ["account", accountId],
    queryFn: () => getAccount(accountId),
    enabled: accountId !== "",
  });
}
