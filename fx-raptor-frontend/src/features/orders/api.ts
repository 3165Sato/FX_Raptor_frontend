import { apiClient } from "@/lib/apiClient";

import { defaultOrderFilters, Order, OrderFilters, OrdersResponse } from "./types";

const mockOrders: Order[] = [
  {
    orderId: "ORD-10001",
    accountId: "A-100",
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
    accountId: "A-100",
    currencyPair: "EUR/JPY",
    side: "SELL",
    orderType: "STOP",
    quantity: 50000,
    status: "PENDING",
    sourceType: "TRIGGER",
    createdAt: "2026-03-10T09:30:00+09:00",
  },
  {
    orderId: "ORD-10003",
    accountId: "A-220",
    currencyPair: "GBP/JPY",
    side: "SELL",
    orderType: "MARKET",
    quantity: 75000,
    status: "REJECTED",
    sourceType: "LIQUIDATION",
    createdAt: "2026-03-10T10:02:00+09:00",
  },
  {
    orderId: "ORD-10004",
    accountId: "A-305",
    currencyPair: "USD/JPY",
    side: "BUY",
    orderType: "LIMIT",
    quantity: 30000,
    status: "CANCELLED",
    sourceType: "USER",
    createdAt: "2026-03-10T10:18:00+09:00",
  },
  {
    orderId: "ORD-10005",
    accountId: "A-220",
    currencyPair: "EUR/USD",
    side: "BUY",
    orderType: "MARKET",
    quantity: 120000,
    status: "PROCESSING",
    sourceType: "TRIGGER",
    createdAt: "2026-03-10T11:05:00+09:00",
  },
];

function applyFilters(orders: Order[], filters: OrderFilters) {
  return orders.filter((order) => {
    const accountMatches =
      !filters.accountId || String(order.accountId).toLowerCase().includes(filters.accountId.toLowerCase());
    const pairMatches =
      !filters.currencyPair ||
      order.currencyPair.toLowerCase().includes(filters.currencyPair.toLowerCase());
    const statusMatches = !filters.status || order.status === filters.status;
    const sourceMatches = !filters.sourceType || order.sourceType === filters.sourceType;

    return accountMatches && pairMatches && statusMatches && sourceMatches;
  });
}

export async function getOrders(filters: OrderFilters = defaultOrderFilters) {
  try {
    return await apiClient<OrdersResponse>("/admin/orders", {
      query: {
        accountId: filters.accountId,
        currencyPair: filters.currencyPair,
        status: filters.status,
        sourceType: filters.sourceType,
      },
    });
  } catch {
    const items = applyFilters(mockOrders, filters);

    return {
      items,
      total: items.length,
    };
  }
}
