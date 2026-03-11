import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getTrades, getTraderTrades } from "./api";
import {
  defaultTradeFilters,
  defaultTraderTradeFilters,
  TradeFilters,
  TraderTradeFilters,
} from "./types";

export function useTradesQuery(filters: TradeFilters = defaultTradeFilters) {
  return useQuery({
    queryKey: ["trades", filters],
    queryFn: () => getTrades(filters),
    placeholderData: keepPreviousData,
  });
}

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
