"use client";

import { create } from "zustand";

type Role = "admin" | "trader";

export const mockAccountOptions = [
  { accountId: "A-100", customerNo: "CUST-90001" },
  { accountId: "A-220", customerNo: "CUST-90002" },
  { accountId: "A-305", customerNo: "CUST-90003" },
] as const;

type SessionStore = {
  selectedAccountId: string | null;
  role: Role;
  setSelectedAccountId: (accountId: string | null) => void;
  setRole: (role: Role) => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
  selectedAccountId: mockAccountOptions[0].accountId,
  role: "admin",
  setSelectedAccountId: (selectedAccountId) => set({ selectedAccountId }),
  setRole: (role) => set({ role }),
}));
