import { apiClient } from "@/lib/apiClient";

import { TradesResponse } from "./types";

export function fetchTrades() {
  return apiClient<TradesResponse>("/api/trades");
}
