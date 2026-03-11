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

export type TraderOrderView = {
  orderId: string | number;
  currencyPair: string;
  side: "BUY" | "SELL";
  orderType: string;
  quantity: number;
  status: string;
  sourceType: "USER" | "TRIGGER" | "LIQUIDATION" | string;
  createdAt: string;
};

export type TraderOrdersResponse = ApiListResponse<TraderOrderView>;

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
  orderId: string;
  accountId: string;
  currencyPair: string;
  side: string;
  status: string;
  sourceType: string;
};

export const defaultOrderFilters: OrderFilters = {
  orderId: "",
  accountId: "",
  currencyPair: "",
  side: "",
  status: "",
  sourceType: "",
};

export type TraderOrderFilters = {
  currencyPair: string;
  side: string;
  status: string;
  sourceType: string;
};

export const defaultTraderOrderFilters: TraderOrderFilters = {
  currencyPair: "",
  side: "",
  status: "",
  sourceType: "",
};
