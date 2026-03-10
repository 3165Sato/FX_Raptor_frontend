import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getTrades } from "./api";
import { defaultTradeFilters, TradeFilters } from "./types";

export function useTradesQuery(filters: TradeFilters = defaultTradeFilters) {
  return useQuery({
    queryKey: ["trades", filters],
    queryFn: () => getTrades(filters),
    placeholderData: keepPreviousData,
  });
}
