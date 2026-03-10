import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getCovers } from "./api";
import { CoverFilters, defaultCoverFilters } from "./types";

export function useCoversQuery(filters: CoverFilters = defaultCoverFilters) {
  return useQuery({
    queryKey: ["covers", filters],
    queryFn: () => getCovers(filters),
    placeholderData: keepPreviousData,
  });
}
