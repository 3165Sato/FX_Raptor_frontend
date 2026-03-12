import { apiClient } from "@/lib/apiClient";

import {
  defaultPositionFilters,
  Position,
  PositionFilters,
  PositionsResponse,
  TraderPositionView,
  TraderPositionsResponse,
} from "./types";

type PositionApiItem = Partial<Position> & {
  id?: string | number | null;
  userId?: string | number | null;
};

type AdminPositionsApiResponse = PositionsResponse | PositionApiItem[];

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

function asNumber(value: unknown) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  return 0;
}

function normalizePosition(item: PositionApiItem): Position {
  return {
    positionId: item.positionId ?? item.id ?? "-",
    accountId: item.accountId ?? item.userId ?? "-",
    currencyPair: item.currencyPair ?? "-",
    side: item.side === "SELL" ? "SELL" : "BUY",
    quantity: asNumber(item.quantity),
    avgPrice: asNumber(item.avgPrice),
    updatedAt: item.updatedAt ?? "-",
  };
}

function normalizeAdminPositionsResponse(payload: AdminPositionsApiResponse): PositionsResponse {
  if (Array.isArray(payload)) {
    return {
      items: payload.map(normalizePosition),
      total: payload.length,
    };
  }

  return {
    items: (payload.items ?? []).map(normalizePosition),
    total: payload.total ?? payload.items?.length ?? 0,
  };
}

export async function getAdminPositions(filters: PositionFilters = defaultPositionFilters) {
  const payload = await apiClient<AdminPositionsApiResponse>("/admin/positions", {
    query: {
      accountId: filters.accountId || undefined,
      currencyPair: filters.currencyPair || undefined,
      side: filters.side || undefined,
    },
  });

  return normalizeAdminPositionsResponse(payload);
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

export const getPositions = getAdminPositions;
