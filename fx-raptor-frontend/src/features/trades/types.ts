import { ApiListResponse } from "@/types/common";

export type Trade = {
  tradeId: string | number;
  orderId: string | number;
  accountId: string | number;
  currencyPair: string;
  side: "BUY" | "SELL";
  executionPrice: number;
  executionQuantity: number;
  executedAt: string;
};

export type TradesResponse = ApiListResponse<Trade>;

export type TraderTradeView = {
  tradeId: string | number;
  orderId: string | number;
  currencyPair: string;
  side: "BUY" | "SELL";
  executionPrice: number;
  executionQuantity: number;
  executedAt: string;
};

export type TraderTradesResponse = ApiListResponse<TraderTradeView>;

export type TradeFilters = {
  accountId: string;
  currencyPair: string;
  side: string;
  orderId: string;
};

export const defaultTradeFilters: TradeFilters = {
  accountId: "",
  currencyPair: "",
  side: "",
  orderId: "",
};

export type TraderTradeFilters = {
  currencyPair: string;
  side: string;
  orderId: string;
};

export const defaultTraderTradeFilters: TraderTradeFilters = {
  currencyPair: "",
  side: "",
  orderId: "",
};
