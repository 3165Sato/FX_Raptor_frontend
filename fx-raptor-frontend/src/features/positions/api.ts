import { apiClient } from "@/lib/apiClient";

import { PositionsResponse } from "./types";

export function fetchPositions() {
  return apiClient<PositionsResponse>("/api/positions");
}
