import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = 'https://api-developer.com/api/contents?populate=publisher,categories&sort=updatedAt:desc'

export const getNews = createAsyncThunk(
    'news/getNews',
    async () => {
        const response = await fetch(url);
        const formatResponse = await response.json();
        return formatResponse.data;
    }
)

export const NewsSlice = createSlice({
    name: 'news',
    initialState: {
        newsItems: [],
        isLoading: false,
        errorMessage: ''
    },
    extraReducers: {
        [getNews.pending]: (state) => { state.isLoading = true },
        [getNews.fulfilled]: (state, action) => { state.isLoading = false; state.newsItems = action.payload },
        [getNews.rejected]: (state) => { state.isLoading = false; state.errorMessage = 'someting is wrong!' }
    }
})

export default NewsSlice.reducer