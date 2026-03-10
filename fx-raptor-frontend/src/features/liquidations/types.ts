import { ApiListResponse } from "@/types/common";

export type LiquidationLog = {
  liquidationLogId: string | number;
  accountId: string | number;
  orderId: string | number;
  tradeId?: string | number | null;
  currencyPair: string;
  side: "BUY" | "SELL";
  quantity: number;
  liquidationReason: string;
  marginRatioAtLiquidation: number;
  createdAt: string;
};

export type LiquidationsResponse = ApiListResponse<LiquidationLog>;

export type LiquidationFilters = {
  accountId: string;
  currencyPair: string;
  side: string;
  liquidationReason: string;
};

export const defaultLiquidationFilters: LiquidationFilters = {
  accountId: "",
  currencyPair: "",
  side: "",
  liquidationReason: "",
};
