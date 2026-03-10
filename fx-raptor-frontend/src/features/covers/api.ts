import { apiClient } from "@/lib/apiClient";

import { CoversResponse } from "./types";

export function fetchCovers() {
  return apiClient<CoversResponse>("/api/admin/covers");
}
