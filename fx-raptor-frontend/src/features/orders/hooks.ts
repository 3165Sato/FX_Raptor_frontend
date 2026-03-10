import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import { getOrders, getQuote, submitMarketOrder } from "./api";
import { defaultOrderFilters, OrderFilters } from "./types";

export function useOrdersQuery(filters: OrderFilters = defaultOrderFilters) {
  return useQuery({
    queryKey: ["orders", filters],
    queryFn: () => getOrders(filters),
    placeholderData: keepPreviousData,
  });
}

export function useQuoteQuery(currencyPair: string) {
  return useQuery({
    queryKey: ["quote", currencyPair],
    queryFn: () => getQuote(currencyPair),
    enabled: Boolean(currencyPair),
    refetchInterval: 10_000,
  });
}

export function useMarketOrderMutation() {
  return useMutation({
    mutationFn: submitMarketOrder,
  });
}
