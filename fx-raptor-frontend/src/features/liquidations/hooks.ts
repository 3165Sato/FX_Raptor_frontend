import { useQuery } from "@tanstack/react-query";

import { fetchLiquidations } from "./api";

export function useLiquidations() {
  return useQuery({
    queryKey: ["liquidations"],
    queryFn: fetchLiquidations,
  });
}
