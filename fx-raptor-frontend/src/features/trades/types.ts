import { ApiListResponse } from "@/types/common";

export type Trade = {
  id: string;
  orderId: string;
  pair: string;
  price: number;
  quantity: number;
  tradedAt: string;
};

export type TradesResponse = ApiListResponse<Trade>;
