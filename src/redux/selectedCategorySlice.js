import { createSlice } from "@reduxjs/toolkit";

export const SelectedCategorySlice = createSlice({
    name: 'CategorySelected',
    initialState: {
        catId: 0,
    },
    reducers: {
        changeNewsCategory(state, action) { state.catId = action.payload }
    }
})
export const { changeNewsCategory } = SelectedCategorySlice.actions
export default SelectedCategorySlice.reducer