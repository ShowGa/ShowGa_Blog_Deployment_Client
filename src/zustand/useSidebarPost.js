import { create } from "zustand";

const useSidebarPostStore = create((set) => ({
  trendyPost: null,
  setTrendyPost: (postData) => {
    set({ trendyPost: postData });
  },
  FeaturedPost: null,
  setFeaturedPost: (postData) => {
    set({ FeaturedPost: postData });
  },
}));

export default useSidebarPostStore;
