import { useQuery } from "@tanstack/react-query";

import { fetchCovers } from "./api";

export function useCovers() {
  return useQuery({
    queryKey: ["covers"],
    queryFn: fetchCovers,
  });
}
