import { apiClient } from "@/lib/apiClient";

import { LiquidationsResponse } from "./types";

export function fetchLiquidations() {
  return apiClient<LiquidationsResponse>("/api/admin/liquidations");
}
