import { apiClient } from "@/lib/apiClient";

import { defaultTradeFilters, Trade, TradeFilters, TradesResponse } from "./types";

const mockTrades: Trade[] = [
  {
    tradeId: "TRD-90001",
    orderId: "ORD-10001",
    accountId: "A-100",
    currencyPair: "USD/JPY",
    side: "BUY",
    executionPrice: 149.285,
    executionQuantity: 100000,
    executedAt: "2026-03-10T09:15:03+09:00",
  },
  {
    tradeId: "TRD-90002",
    orderId: "ORD-10006",
    accountId: "A-220",
    currencyPair: "EUR/JPY",
    side: "SELL",
    executionPrice: 161.442,
    executionQuantity: 50000,
    executedAt: "2026-03-10T09:46:14+09:00",
  },
  {
    tradeId: "TRD-90003",
    orderId: "ORD-10008",
    accountId: "A-305",
    currencyPair: "GBP/JPY",
    side: "SELL",
    executionPrice: 192.108,
    executionQuantity: 75000,
    executedAt: "2026-03-10T10:12:40+09:00",
  },
  {
    tradeId: "TRD-90004",
    orderId: "ORD-10010",
    accountId: "A-220",
    currencyPair: "EUR/USD",
    side: "BUY",
    executionPrice: 1.0862,
    executionQuantity: 120000,
    executedAt: "2026-03-10T10:58:07+09:00",
  },
  {
    tradeId: "TRD-90005",
    orderId: "ORD-10011",
    accountId: "A-100",
    currencyPair: "USD/JPY",
    side: "SELL",
    executionPrice: 149.198,
    executionQuantity: 30000,
    executedAt: "2026-03-10T11:20:22+09:00",
  },
];

function applyFilters(trades: Trade[], filters: TradeFilters) {
  return trades.filter((trade) => {
    const accountMatches =
      !filters.accountId || String(trade.accountId).toLowerCase().includes(filters.accountId.toLowerCase());
    const pairMatches =
      !filters.currencyPair ||
      trade.currencyPair.toLowerCase().includes(filters.currencyPair.toLowerCase());
    const sideMatches = !filters.side || trade.side === filters.side;
    const orderMatches =
      !filters.orderId || String(trade.orderId).toLowerCase().includes(filters.orderId.toLowerCase());

    return accountMatches && pairMatches && sideMatches && orderMatches;
  });
}

export async function getTrades(filters: TradeFilters = defaultTradeFilters) {
  try {
    return await apiClient<TradesResponse>("/admin/trades", {
      query: {
        accountId: filters.accountId,
        currencyPair: filters.currencyPair,
        side: filters.side,
        orderId: filters.orderId,
      },
    });
  } catch {
    const items = applyFilters(mockTrades, filters);

    return {
      items,
      total: items.length,
    };
  }
}
