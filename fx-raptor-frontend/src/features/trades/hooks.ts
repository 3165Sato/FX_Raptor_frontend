import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getAdminTrades, getTraderTrades } from "./api";
import {
  defaultTradeFilters,
  defaultTraderTradeFilters,
  TradeFilters,
  TraderTradeFilters,
} from "./types";

export function useAdminTradesQuery(filters: TradeFilters = defaultTradeFilters) {
  return useQuery({
    queryKey: ["admin-trades", filters],
    queryFn: () => getAdminTrades(filters),
    placeholderData: keepPreviousData,
  });
}

export const useTradesQuery = useAdminTradesQuery;

export function useTraderTradesQuery(
  accountId: string | number,
  filters: TraderTradeFilters = defaultTraderTradeFilters,
) {
  return useQuery({
    queryKey: ["trader-trades", accountId, filters],
    queryFn: () => getTraderTrades(accountId, filters),
    enabled: accountId !== "",
    placeholderData: keepPreviousData,
  });
}
