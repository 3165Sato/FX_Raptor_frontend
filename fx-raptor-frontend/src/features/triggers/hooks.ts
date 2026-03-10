import { useQuery } from "@tanstack/react-query";

import { fetchTriggers } from "./api";

export function useTriggers() {
  return useQuery({
    queryKey: ["triggers"],
    queryFn: fetchTriggers,
  });
}
