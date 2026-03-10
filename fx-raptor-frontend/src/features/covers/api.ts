import { apiClient } from "@/lib/apiClient";

import { Cover, CoverFilters, CoversResponse, defaultCoverFilters } from "./types";

const mockCovers: Cover[] = [
  {
    coverOrderId: "COV-30001",
    tradeId: "TRD-90001",
    accountId: "A-100",
    currencyPair: "USD/JPY",
    side: "SELL",
    quantity: 100000,
    requestedPrice: 149.287,
    status: "FILLED",
    coverMode: "FULL",
    executedPrice: 149.289,
    executedQuantity: 100000,
    executionResult: "SUCCESS",
    executedAt: "2026-03-10T09:15:05+09:00",
  },
  {
    coverOrderId: "COV-30002",
    tradeId: "TRD-90002",
    accountId: "A-220",
    currencyPair: "EUR/JPY",
    side: "BUY",
    quantity: 50000,
    requestedPrice: 161.438,
    status: "FILLED",
    coverMode: "THRESHOLD",
    executedPrice: 161.441,
    executedQuantity: 50000,
    executionResult: "SUCCESS",
    executedAt: "2026-03-10T09:46:20+09:00",
  },
  {
    coverOrderId: "COV-30003",
    tradeId: "TRD-90003",
    accountId: "A-220",
    currencyPair: "GBP/JPY",
    side: "BUY",
    quantity: 75000,
    requestedPrice: 192.112,
    status: "FAILED",
    coverMode: "FULL",
    executedPrice: null,
    executedQuantity: null,
    executionResult: "REJECTED",
    executedAt: null,
  },
  {
    coverOrderId: "COV-30004",
    tradeId: "TRD-90011",
    accountId: "A-305",
    currencyPair: "EUR/USD",
    side: "SELL",
    quantity: 120000,
    requestedPrice: 1.0861,
    status: "PENDING",
    coverMode: "THRESHOLD",
    executedPrice: null,
    executedQuantity: null,
    executionResult: "WAITING",
    executedAt: null,
  },
  {
    coverOrderId: "COV-30005",
    tradeId: "TRD-90015",
    accountId: "A-512",
    currencyPair: "AUD/JPY",
    side: "SELL",
    quantity: 90000,
    requestedPrice: 98.321,
    status: "SKIPPED",
    coverMode: "DISABLED",
    executedPrice: null,
    executedQuantity: null,
    executionResult: "SKIPPED",
    executedAt: null,
  },
];

function applyFilters(items: Cover[], filters: CoverFilters) {
  return items.filter((item) => {
    const accountMatches =
      !filters.accountId || String(item.accountId).toLowerCase().includes(filters.accountId.toLowerCase());
    const pairMatches =
      !filters.currencyPair || item.currencyPair.toLowerCase().includes(filters.currencyPair.toLowerCase());
    const sideMatches = !filters.side || item.side === filters.side;
    const statusMatches = !filters.status || item.status === filters.status;
    const modeMatches = !filters.coverMode || item.coverMode === filters.coverMode;
    const resultMatches =
      !filters.executionResult || (item.executionResult ?? "") === filters.executionResult;

    return accountMatches && pairMatches && sideMatches && statusMatches && modeMatches && resultMatches;
  });
}

export async function getCovers(filters: CoverFilters = defaultCoverFilters) {
  try {
    return await apiClient<CoversResponse>("/admin/covers", {
      query: {
        accountId: filters.accountId,
        currencyPair: filters.currencyPair,
        side: filters.side,
        status: filters.status,
        coverMode: filters.coverMode,
        executionResult: filters.executionResult,
      },
    });
  } catch {
    const items = applyFilters(mockCovers, filters);

    return {
      items,
      total: items.length,
    };
  }
}
