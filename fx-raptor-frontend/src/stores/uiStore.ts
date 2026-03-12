"use client";

import { create } from "zustand";

type UiStore = {
  sidebarOpen: boolean;
  activePair: string;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setActivePair: (pair: string) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  sidebarOpen: true,
  activePair: "USD/JPY",
  setSidebarOpen: (sidebarOpen) =>
    set((state) => (state.sidebarOpen === sidebarOpen ? state : { sidebarOpen })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setActivePair: (activePair) => set((state) => (state.activePair === activePair ? state : { activePair })),
}));
