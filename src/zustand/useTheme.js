import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: JSON.parse(localStorage.getItem("theme")) || "light",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));

export default useThemeStore;
