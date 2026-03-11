import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getPositions, getTraderPositions } from "./api";
import { defaultPositionFilters, PositionFilters } from "./types";

export function usePositionsQuery(filters: PositionFilters = defaultPositionFilters) {
  return useQuery({
    queryKey: ["positions", filters],
    queryFn: () => getPositions(filters),
    placeholderData: keepPreviousData,
  });
}

export function useTraderPositionsQuery(accountId: string | number) {
  return useQuery({
    queryKey: ["trader-positions", accountId],
    queryFn: () => getTraderPositions(accountId),
    enabled: accountId !== "",
  });
}
