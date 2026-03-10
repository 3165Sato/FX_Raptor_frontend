import { ApiListResponse } from "@/types/common";

export type Order = {
  id: string;
  pair: string;
  side: "BUY" | "SELL";
  quantity: number;
  status: "PENDING" | "FILLED" | "CANCELLED";
};

export type OrdersResponse = ApiListResponse<Order>;
