import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getOrders } from "./api";
import { defaultOrderFilters, OrderFilters } from "./types";

export function useOrdersQuery(filters: OrderFilters = defaultOrderFilters) {
  return useQuery({
    queryKey: ["orders", filters],
    queryFn: () => getOrders(filters),
    placeholderData: keepPreviousData,
  });
}
