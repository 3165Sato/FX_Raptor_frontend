import { apiClient } from "@/lib/apiClient";

import { OrdersResponse } from "./types";

export function fetchOrders() {
  return apiClient<OrdersResponse>("/api/orders");
}
