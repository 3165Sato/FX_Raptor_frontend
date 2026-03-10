import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getPositions } from "./api";
import { defaultPositionFilters, PositionFilters } from "./types";

export function usePositionsQuery(filters: PositionFilters = defaultPositionFilters) {
  return useQuery({
    queryKey: ["positions", filters],
    queryFn: () => getPositions(filters),
    placeholderData: keepPreviousData,
  });
}
