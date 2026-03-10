import { ApiListResponse } from "@/types/common";

export type Cover = {
  coverOrderId: string | number;
  tradeId: string | number;
  accountId: string | number;
  currencyPair: string;
  side: "BUY" | "SELL";
  quantity: number;
  requestedPrice: number;
  status: string;
  coverMode: "FULL" | "THRESHOLD" | "DISABLED" | string;
  executedPrice?: number | null;
  executedQuantity?: number | null;
  executionResult?: string | null;
  executedAt?: string | null;
};

export type CoversResponse = ApiListResponse<Cover>;

export type CoverFilters = {
  accountId: string;
  currencyPair: string;
  side: string;
  status: string;
  coverMode: string;
  executionResult: string;
};

export const defaultCoverFilters: CoverFilters = {
  accountId: "",
  currencyPair: "",
  side: "",
  status: "",
  coverMode: "",
  executionResult: "",
};
