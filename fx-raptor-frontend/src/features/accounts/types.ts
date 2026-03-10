import { ApiListResponse } from "@/types/common";

export type Account = {
  id: string;
  name: string;
  balance: number;
  equity: number;
  status: "active" | "suspended";
};

export type AccountsResponse = ApiListResponse<Account>;
