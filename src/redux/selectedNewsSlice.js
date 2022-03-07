import { createSlice } from "@reduxjs/toolkit";

export const SelectedNewsSlice = createSlice({
    name: 'NewsSelected',
    initialState: {
        newsUrl: '',
    },
    reducers: {
        getNewsUrl(state, action) { state.newsUrl = action.payload }
    }
})
export const { getNewsUrl } = SelectedNewsSlice.actions
export default SelectedNewsSlice.reducer

