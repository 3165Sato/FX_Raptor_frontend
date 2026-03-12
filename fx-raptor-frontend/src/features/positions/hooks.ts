import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getAdminPositions, getTraderPositions } from "./api";
import { defaultPositionFilters, PositionFilters } from "./types";

export function useAdminPositionsQuery(filters: PositionFilters = defaultPositionFilters) {
  return useQuery({
    queryKey: ["admin-positions", filters],
    queryFn: () => getAdminPositions(filters),
    placeholderData: keepPreviousData,
  });
}

export const usePositionsQuery = useAdminPositionsQuery;

export function useTraderPositionsQuery(accountId: string | number) {
  return useQuery({
    queryKey: ["trader-positions", accountId],
    queryFn: () => getTraderPositions(accountId),
    enabled: accountId !== "",
  });
}
