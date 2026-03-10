import { apiClient } from "@/lib/apiClient";

import {
  defaultLiquidationFilters,
  LiquidationFilters,
  LiquidationLog,
  LiquidationsResponse,
} from "./types";

const mockLiquidations: LiquidationLog[] = [
  {
    liquidationLogId: "LQ-50001",
    accountId: "A-220",
    orderId: "ORD-10003",
    tradeId: "TRD-90003",
    currencyPair: "GBP/JPY",
    side: "SELL",
    quantity: 75000,
    liquidationReason: "MARGIN_CALL_BREACH",
    marginRatioAtLiquidation: 42.5,
    createdAt: "2026-03-10T09:18:00+09:00",
  },
  {
    liquidationLogId: "LQ-50002",
    accountId: "A-305",
    orderId: "ORD-10015",
    tradeId: "TRD-90008",
    currencyPair: "EUR/USD",
    side: "BUY",
    quantity: 120000,
    liquidationReason: "AUTO_CUT",
    marginRatioAtLiquidation: 48.2,
    createdAt: "2026-03-10T10:05:00+09:00",
  },
  {
    liquidationLogId: "LQ-50003",
    accountId: "A-410",
    orderId: "ORD-10021",
    tradeId: null,
    currencyPair: "USD/JPY",
    side: "BUY",
    quantity: 30000,
    liquidationReason: "MARGIN_CALL_BREACH",
    marginRatioAtLiquidation: 49.7,
    createdAt: "2026-03-10T11:42:00+09:00",
  },
  {
    liquidationLogId: "LQ-50004",
    accountId: "A-220",
    orderId: "ORD-10024",
    tradeId: "TRD-90011",
    currencyPair: "EUR/JPY",
    side: "SELL",
    quantity: 50000,
    liquidationReason: "RISK_LIMIT_EXCEEDED",
    marginRatioAtLiquidation: 55.1,
    createdAt: "2026-03-09T15:25:00+09:00",
  },
  {
    liquidationLogId: "LQ-50005",
    accountId: "A-512",
    orderId: "ORD-10028",
    tradeId: "TRD-90015",
    currencyPair: "AUD/JPY",
    side: "BUY",
    quantity: 90000,
    liquidationReason: "AUTO_CUT",
    marginRatioAtLiquidation: 46.9,
    createdAt: "2026-03-09T18:11:00+09:00",
  },
];

function applyFilters(items: LiquidationLog[], filters: LiquidationFilters) {
  return items.filter((item) => {
    const accountMatches =
      !filters.accountId || String(item.accountId).toLowerCase().includes(filters.accountId.toLowerCase());
    const pairMatches =
      !filters.currencyPair || item.currencyPair.toLowerCase().includes(filters.currencyPair.toLowerCase());
    const sideMatches = !filters.side || item.side === filters.side;
    const reasonMatches =
      !filters.liquidationReason || item.liquidationReason === filters.liquidationReason;

    return accountMatches && pairMatches && sideMatches && reasonMatches;
  });
}

export async function getLiquidations(filters: LiquidationFilters = defaultLiquidationFilters) {
  try {
    return await apiClient<LiquidationsResponse>("/admin/liquidations", {
      query: {
        accountId: filters.accountId,
        currencyPair: filters.currencyPair,
        side: filters.side,
        liquidationReason: filters.liquidationReason,
      },
    });
  } catch {
    const items = applyFilters(mockLiquidations, filters);

    return {
      items,
      total: items.length,
    };
  }
}
