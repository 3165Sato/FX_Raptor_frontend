"use client";

import { create } from "zustand";

type Role = "admin" | "trader";

type SessionStore = {
  selectedAccountId: string | null;
  role: Role;
  setSelectedAccountId: (accountId: string | null) => void;
  setRole: (role: Role) => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
  selectedAccountId: null,
  role: "admin",
  setSelectedAccountId: (selectedAccountId) => set({ selectedAccountId }),
  setRole: (role) => set({ role }),
}));
