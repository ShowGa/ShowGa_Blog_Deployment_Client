import { create } from "zustand";

const useAuthUserStore = create((set) => ({
  authUser: JSON.parse(localStorage.getItem("auth-user")) || null,
  loginSetAuthUser: (userData) => {
    localStorage.setItem("auth-user", JSON.stringify(userData));
    set({ authUser: userData });
  },
  logoutSetAuthUser: () => {
    localStorage.removeItem("auth-user");
    set({ authUser: null });
  },
}));

export default useAuthUserStore;
