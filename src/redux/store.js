import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./categorySlice";
import NewsSlice from "./newsSlice";
import selectedCategorySlice from "./selectedCategorySlice";
import selectedNewsSlice from "./selectedNewsSlice";


export const rootStore = configureStore({
    reducer: {
        category: CategorySlice,
        news: NewsSlice,
        selectedCategoryId: selectedCategorySlice,
        selectedNewsUrl: selectedNewsSlice
    }
})
