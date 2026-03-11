import { useMutation, useQuery } from "@tanstack/react-query";

import { createTriggerOrder, getTriggerQuote } from "./api";

export function useTriggerQuoteQuery(currencyPair: string) {
  return useQuery({
    queryKey: ["trigger-quote", currencyPair],
    queryFn: () => getTriggerQuote(currencyPair),
    enabled: Boolean(currencyPair),
    refetchInterval: 10_000,
  });
}

export function useCreateTriggerMutation() {
  return useMutation({
    mutationFn: createTriggerOrder,
  });
}
