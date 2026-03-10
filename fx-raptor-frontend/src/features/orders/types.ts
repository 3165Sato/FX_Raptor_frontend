import { ApiListResponse } from "@/types/common";

export type Order = {
  orderId: string | number;
  accountId: string | number;
  currencyPair: string;
  side: "BUY" | "SELL";
  orderType: string;
  quantity: number;
  status: string;
  sourceType: "USER" | "TRIGGER" | "LIQUIDATION" | string;
  createdAt: string;
};

export type OrdersResponse = ApiListResponse<Order>;

export type MarketOrderRequest = {
  accountId: string | number;
  currencyPair: string;
  side: "BUY" | "SELL";
  quantity: number;
};

export type MarketOrderResponse = {
  orderId: string | number;
  status: string;
  message: string;
  acceptedAt: string;
};

export type Quote = {
  currencyPair: string;
  bid: number;
  ask: number;
  timestamp: string;
};

export type OrderFilters = {
  accountId: string;
  currencyPair: string;
  status: string;
  sourceType: string;
};

export const defaultOrderFilters: OrderFilters = {
  accountId: "",
  currencyPair: "",
  status: "",
  sourceType: "",
};
