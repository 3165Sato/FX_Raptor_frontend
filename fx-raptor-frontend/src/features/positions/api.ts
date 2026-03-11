import { apiClient } from "@/lib/apiClient";

import {
  defaultPositionFilters,
  Position,
  PositionFilters,
  PositionsResponse,
  TraderPositionView,
  TraderPositionsResponse,
} from "./types";

const mockPositions: Position[] = [
  {
    positionId: "POS-70001",
    accountId: "A-100",
    currencyPair: "USD/JPY",
    side: "BUY",
    quantity: 100000,
    avgPrice: 149.285,
    updatedAt: "2026-03-10T11:22:00+09:00",
  },
  {
    positionId: "POS-70002",
    accountId: "A-100",
    currencyPair: "EUR/JPY",
    side: "SELL",
    quantity: 50000,
    avgPrice: 161.442,
    updatedAt: "2026-03-10T11:10:00+09:00",
  },
  {
    positionId: "POS-70003",
    accountId: "A-220",
    currencyPair: "GBP/JPY",
    side: "SELL",
    quantity: 75000,
    avgPrice: 192.108,
    updatedAt: "2026-03-10T10:58:00+09:00",
  },
  {
    positionId: "POS-70004",
    accountId: "A-305",
    currencyPair: "EUR/USD",
    side: "BUY",
    quantity: 120000,
    avgPrice: 1.0862,
    updatedAt: "2026-03-10T10:45:00+09:00",
  },
  {
    positionId: "POS-70005",
    accountId: "A-220",
    currencyPair: "USD/JPY",
    side: "BUY",
    quantity: 30000,
    avgPrice: 149.198,
    updatedAt: "2026-03-10T10:30:00+09:00",
  },
];

const mockTraderPositionsByAccount: Record<string, TraderPositionView[]> = {
  "A-100": [
    {
      positionId: "POS-70001",
      currencyPair: "USD/JPY",
      side: "BUY",
      quantity: 100000,
      avgPrice: 149.285,
      currentPrice: 149.321,
      unrealizedPnL: 3600,
      updatedAt: "2026-03-11T10:42:00+09:00",
    },
    {
      positionId: "POS-70002",
      currencyPair: "EUR/JPY",
      side: "SELL",
      quantity: 50000,
      avgPrice: 161.442,
      currentPrice: 161.398,
      unrealizedPnL: 2200,
      updatedAt: "2026-03-11T10:38:00+09:00",
    },
  ],
  "A-220": [
    {
      positionId: "POS-70003",
      currencyPair: "GBP/JPY",
      side: "SELL",
      quantity: 75000,
      avgPrice: 192.108,
      currentPrice: 192.254,
      unrealizedPnL: -10950,
      updatedAt: "2026-03-11T10:35:00+09:00",
    },
    {
      positionId: "POS-70005",
      currencyPair: "USD/JPY",
      side: "BUY",
      quantity: 30000,
      avgPrice: 149.198,
      currentPrice: 149.321,
      unrealizedPnL: 3690,
      updatedAt: "2026-03-11T10:40:00+09:00",
    },
  ],
  "A-305": [
    {
      positionId: "POS-70004",
      currencyPair: "EUR/USD",
      side: "BUY",
      quantity: 120000,
      avgPrice: 1.0862,
      currentPrice: 1.0849,
      unrealizedPnL: -15600,
      updatedAt: "2026-03-11T10:29:00+09:00",
    },
  ],
};

function applyFilters(positions: Position[], filters: PositionFilters) {
  return positions.filter((position) => {
    const accountMatches =
      !filters.accountId || String(position.accountId).toLowerCase().includes(filters.accountId.toLowerCase());
    const pairMatches =
      !filters.currencyPair ||
      position.currencyPair.toLowerCase().includes(filters.currencyPair.toLowerCase());
    const sideMatches = !filters.side || position.side === filters.side;

    return accountMatches && pairMatches && sideMatches;
  });
}

export async function getPositions(filters: PositionFilters = defaultPositionFilters) {
  try {
    return await apiClient<PositionsResponse>("/admin/positions", {
      query: {
        accountId: filters.accountId,
        currencyPair: filters.currencyPair,
        side: filters.side,
      },
    });
  } catch {
    const items = applyFilters(mockPositions, filters);

    return {
      items,
      total: items.length,
    };
  }
}

export async function getTraderPositions(accountId: string | number) {
  try {
    return await apiClient<TraderPositionsResponse>("/api/positions", {
      query: {
        accountId,
      },
    });
  } catch {
    const items = mockTraderPositionsByAccount[String(accountId)] ?? mockTraderPositionsByAccount["A-100"];

    return {
      items,
      total: items.length,
    };
  }
}
