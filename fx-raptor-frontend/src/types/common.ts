import { ReactNode } from "react";

export type Role = "admin" | "trader";

export type PairCode = "USD/JPY" | "EUR/JPY" | "GBP/JPY";

export type ApiListResponse<T> = {
  items: T[];
  total: number;
};

export type TableColumn<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
};
