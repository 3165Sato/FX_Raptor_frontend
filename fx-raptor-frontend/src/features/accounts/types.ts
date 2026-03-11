import { ApiListResponse } from "@/types/common";

export type Account = {
  id: string;
  name: string;
  balance: number;
  equity: number;
  status: "active" | "suspended";
};

export type AccountsResponse = ApiListResponse<Account>;

export type AccountView = {
  accountId: string | number;
  customerNo?: string;
  currencyCode: string;
  balance: number;
  unrealizedPnL: number;
  equity: number;
  requiredMargin: number;
  marginRatio: number;
  updatedAt?: string;
};
