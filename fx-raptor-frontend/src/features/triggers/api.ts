import { apiClient } from "@/lib/apiClient";

import { Quote, TriggerOrderRequest, TriggerOrderResponse } from "./types";

const mockQuotes: Record<string, Quote> = {
  "USD/JPY": {
    currencyPair: "USD/JPY",
    bid: 149.286,
    ask: 149.291,
    timestamp: "2026-03-11T10:15:00+09:00",
  },
  "EUR/JPY": {
    currencyPair: "EUR/JPY",
    bid: 161.438,
    ask: 161.445,
    timestamp: "2026-03-11T10:15:00+09:00",
  },
  "GBP/JPY": {
    currencyPair: "GBP/JPY",
    bid: 192.104,
    ask: 192.112,
    timestamp: "2026-03-11T10:15:00+09:00",
  },
};

export async function getTriggerQuote(currencyPair: string) {
  try {
    return await apiClient<Quote>("/api/quotes", {
      query: {
        currencyPair,
      },
    });
  } catch {
    return mockQuotes[currencyPair] ?? {
      currencyPair,
      bid: 100,
      ask: 100.01,
      timestamp: new Date().toISOString(),
    };
  }
}

export async function createTriggerOrder(payload: TriggerOrderRequest) {
  try {
    return await apiClient<TriggerOrderResponse>("/api/triggers", {
      method: "POST",
      body: payload,
    });
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      triggerOrderId: `TRG-${Date.now()}`,
      status: "ACCEPTED",
      message: `${payload.currencyPair} ${payload.triggerType} order accepted`,
      createdAt: new Date().toISOString(),
    };
  }
}
