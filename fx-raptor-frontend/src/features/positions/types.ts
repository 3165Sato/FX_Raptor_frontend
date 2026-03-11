import { ApiListResponse } from "@/types/common";

export type Position = {
  positionId: string | number;
  accountId: string | number;
  currencyPair: string;
  side: "BUY" | "SELL";
  quantity: number;
  avgPrice: number;
  updatedAt: string;
};

export type PositionsResponse = ApiListResponse<Position>;

export type TraderPositionView = {
  positionId: string | number;
  currencyPair: string;
  side: "BUY" | "SELL";
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  unrealizedPnL: number;
  updatedAt?: string;
};

export type TraderPositionsResponse = ApiListResponse<TraderPositionView>;

export type PositionFilters = {
  accountId: string;
  currencyPair: string;
  side: string;
};

export const defaultPositionFilters: PositionFilters = {
  accountId: "",
  currencyPair: "",
  side: "",
};
