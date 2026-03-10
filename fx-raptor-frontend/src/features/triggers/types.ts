import { ApiListResponse } from "@/types/common";

export type Trigger = {
  id: string;
  pair: string;
  triggerType: "STOP" | "LIMIT";
  triggerPrice: number;
  status: "ARMED" | "FIRED" | "CANCELLED";
};

export type TriggersResponse = ApiListResponse<Trigger>;
