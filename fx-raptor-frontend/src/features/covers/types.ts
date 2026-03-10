import { ApiListResponse } from "@/types/common";

export type Cover = {
  id: string;
  sourceOrderId: string;
  pair: string;
  quantity: number;
  status: "REQUESTED" | "EXECUTED" | "FAILED";
};

export type CoversResponse = ApiListResponse<Cover>;
