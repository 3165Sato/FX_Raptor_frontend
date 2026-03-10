import { ApiListResponse } from "@/types/common";

export type Position = {
  id: string;
  pair: string;
  side: "LONG" | "SHORT";
  quantity: number;
  averagePrice: number;
  pnl: number;
};

export type PositionsResponse = ApiListResponse<Position>;
