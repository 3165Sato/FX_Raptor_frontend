import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getLiquidations } from "./api";
import { defaultLiquidationFilters, LiquidationFilters } from "./types";

export function useLiquidationsQuery(filters: LiquidationFilters = defaultLiquidationFilters) {
  return useQuery({
    queryKey: ["liquidations", filters],
    queryFn: () => getLiquidations(filters),
    placeholderData: keepPreviousData,
  });
}
