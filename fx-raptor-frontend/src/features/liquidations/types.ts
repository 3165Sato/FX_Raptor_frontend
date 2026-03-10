import { ApiListResponse } from "@/types/common";

export type Liquidation = {
  id: string;
  accountId: string;
  pair: string;
  quantity: number;
  executedAt: string;
};

export type LiquidationsResponse = ApiListResponse<Liquidation>;
