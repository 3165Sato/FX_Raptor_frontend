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
