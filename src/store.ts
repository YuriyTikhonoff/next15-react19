import { create } from "zustand";

interface AppState {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useStore = create<AppState>((set) => ({
  theme: "light",
  setTheme: () => set((state) => state.theme === "light" ? ({ theme: "dark" }) : ({ theme: "light" })),
}));