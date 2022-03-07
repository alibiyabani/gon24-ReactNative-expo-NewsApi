import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = 'https://api-developer.com/api/categories'

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async () => {
        const response = await fetch(url);
        const formatResponse = await response.json();
        return formatResponse.data;
    }
)

export const CategorySlice = createSlice({
    name: 'category',
    initialState: {
        categoriesList: [],
        isLoading: false,
        errorMessage: ''
    },
    extraReducers: {
        [getCategories.pending]: (state) => {
            state.isLoading = true;
        },
        [getCategories.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.categoriesList = action.payload
        },
        [getCategories.rejected]: (state) => {
            state.isLoading = false;
            state.errorMessage = 'something is wrong';
        }
    }
})

export default CategorySlice.reducer;