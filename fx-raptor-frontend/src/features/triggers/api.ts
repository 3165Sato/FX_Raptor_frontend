import { apiClient } from "@/lib/apiClient";

import { TriggersResponse } from "./types";

export function fetchTriggers() {
  return apiClient<TriggersResponse>("/api/triggers");
}
