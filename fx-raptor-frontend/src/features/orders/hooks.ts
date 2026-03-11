import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import { getOrders, getQuote, getTraderOrders, submitMarketOrder } from "./api";
import {
  defaultOrderFilters,
  defaultTraderOrderFilters,
  OrderFilters,
  TraderOrderFilters,
} from "./types";

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

export function useTraderOrdersQuery(
  accountId: string | number,
  filters: TraderOrderFilters = defaultTraderOrderFilters,
) {
  return useQuery({
    queryKey: ["trader-orders", accountId, filters],
    queryFn: () => getTraderOrders(accountId, filters),
    enabled: accountId !== "",
    placeholderData: keepPreviousData,
  });
}
