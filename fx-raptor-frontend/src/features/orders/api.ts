import { apiClient } from "@/lib/apiClient";

import {
  defaultOrderFilters,
  defaultTraderOrderFilters,
  MarketOrderRequest,
  MarketOrderResponse,
  Order,
  OrderApiItem,
  OrderFilters,
  OrdersResponse,
  Quote,
  TraderOrderFilters,
  TraderOrdersResponse,
  TraderOrderView,
} from "./types";

type AdminOrdersApiResponse = OrdersResponse | OrderApiItem[];
type RawAdminOrder = Record<string, unknown>;

const mockQuotes: Record<string, Quote> = {
  "USD/JPY": {
    currencyPair: "USD/JPY",
    bid: 149.286,
    ask: 149.291,
    timestamp: "2026-03-10T11:48:00+09:00",
  },
  "EUR/JPY": {
    currencyPair: "EUR/JPY",
    bid: 161.438,
    ask: 161.445,
    timestamp: "2026-03-10T11:48:00+09:00",
  },
  "GBP/JPY": {
    currencyPair: "GBP/JPY",
    bid: 192.104,
    ask: 192.112,
    timestamp: "2026-03-10T11:48:00+09:00",
  },
};

const mockTraderOrdersByAccount: Record<string, TraderOrderView[]> = {
  "A-100": [
    {
      orderId: "ORD-10001",
      currencyPair: "USD/JPY",
      side: "BUY",
      orderType: "MARKET",
      quantity: 100000,
      status: "FILLED",
      sourceType: "USER",
      createdAt: "2026-03-10T09:15:00+09:00",
    },
    {
      orderId: "ORD-10002",
      currencyPair: "EUR/JPY",
      side: "SELL",
      orderType: "STOP",
      quantity: 50000,
      status: "NEW",
      sourceType: "TRIGGER",
      createdAt: "2026-03-10T09:30:00+09:00",
    },
    {
      orderId: "ORD-10009",
      currencyPair: "USD/JPY",
      side: "SELL",
      orderType: "MARKET",
      quantity: 30000,
      status: "CANCELLED",
      sourceType: "USER",
      createdAt: "2026-03-11T09:05:00+09:00",
    },
  ],
  "A-220": [
    {
      orderId: "ORD-10003",
      currencyPair: "GBP/JPY",
      side: "SELL",
      orderType: "MARKET",
      quantity: 75000,
      status: "FILLED",
      sourceType: "LIQUIDATION",
      createdAt: "2026-03-10T10:02:00+09:00",
    },
    {
      orderId: "ORD-10005",
      currencyPair: "EUR/USD",
      side: "BUY",
      orderType: "MARKET",
      quantity: 120000,
      status: "NEW",
      sourceType: "TRIGGER",
      createdAt: "2026-03-10T11:05:00+09:00",
    },
  ],
  "A-305": [
    {
      orderId: "ORD-10004",
      currencyPair: "USD/JPY",
      side: "BUY",
      orderType: "LIMIT",
      quantity: 30000,
      status: "CANCELLED",
      sourceType: "USER",
      createdAt: "2026-03-10T10:18:00+09:00",
    },
  ],
};

function normalizeOrdersResponse(payload: AdminOrdersApiResponse): OrdersResponse {
  if (Array.isArray(payload)) {
    return {
      items: payload.map(normalizeAdminOrder),
      total: payload.length,
    };
  }

  return {
    items: (payload.items ?? []).map(normalizeAdminOrder),
    total: payload.total ?? payload.items?.length ?? 0,
  };
}

function normalizeAdminOrder(order: OrderApiItem | RawAdminOrder): Order {
  const raw = order as RawAdminOrder;

  return {
    orderId: asNullableValue(raw.orderId ?? raw.id),
    accountId: asNullableValue(raw.accountId ?? raw.userId),
    currencyPair: String(raw.currencyPair ?? "-"),
    side: String(raw.side ?? "BUY") as Order["side"],
    orderType: asNullableString(raw.orderType ?? raw.type),
    quantity: asNumber(raw.quantity),
    status: String(raw.status ?? "-"),
    sourceType: asNullableString(raw.sourceType),
    createdAt: String(raw.createdAt ?? ""),
  };
}

function asNullableValue(value: unknown) {
  return value === null || value === undefined ? null : (value as string | number);
}

function asNullableString(value: unknown) {
  return value === null || value === undefined ? null : String(value);
}

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

function applyTraderFilters(orders: TraderOrderView[], filters: TraderOrderFilters) {
  return orders.filter((order) => {
    const pairMatches =
      !filters.currencyPair ||
      order.currencyPair.toLowerCase().includes(filters.currencyPair.toLowerCase());
    const sideMatches = !filters.side || order.side === filters.side;
    const statusMatches = !filters.status || order.status === filters.status;
    const sourceMatches = !filters.sourceType || order.sourceType === filters.sourceType;

    return pairMatches && sideMatches && statusMatches && sourceMatches;
  });
}

export async function getAdminOrders(filters: OrderFilters = defaultOrderFilters) {
  const payload = await apiClient<AdminOrdersApiResponse>("/admin/orders", {
    query: {
      orderId: filters.orderId || undefined,
      accountId: filters.accountId || undefined,
      currencyPair: filters.currencyPair || undefined,
      side: filters.side || undefined,
      status: filters.status || undefined,
      sourceType: filters.sourceType || undefined,
    },
  });

  return normalizeOrdersResponse(payload);
}

export async function getQuote(currencyPair: string) {
  try {
    return await apiClient<Quote>("/api/quotes", {
      query: {
        currencyPair,
      },
    });
  } catch {
    return (
      mockQuotes[currencyPair] ?? {
        currencyPair,
        bid: 100,
        ask: 100.01,
        timestamp: new Date().toISOString(),
      }
    );
  }
}

export async function submitMarketOrder(payload: MarketOrderRequest) {
  try {
    return await apiClient<MarketOrderResponse>("/api/orders/market", {
      method: "POST",
      body: payload,
    });
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      orderId: `MOCK-${Date.now()}`,
      status: "ACCEPTED",
      message: `${payload.currencyPair} ${payload.side} ${payload.quantity.toLocaleString("ja-JP")} accepted`,
      acceptedAt: new Date().toISOString(),
    };
  }
}

export async function getTraderOrders(
  accountId: string | number,
  filters: TraderOrderFilters = defaultTraderOrderFilters,
) {
  try {
    return await apiClient<TraderOrdersResponse>("/api/orders", {
      query: {
        accountId,
        currencyPair: filters.currencyPair || undefined,
        side: filters.side || undefined,
        status: filters.status || undefined,
        sourceType: filters.sourceType || undefined,
      },
    });
  } catch {
    const accountOrders =
      mockTraderOrdersByAccount[String(accountId)] ?? mockTraderOrdersByAccount["A-100"];
    const items = applyTraderFilters(accountOrders, filters);

    return {
      items,
      total: items.length,
    };
  }
}

export const getOrders = getAdminOrders;
