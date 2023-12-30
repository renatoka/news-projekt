import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../../../../src/handlers/categories/entities/category.entity';

declare module 'redux' {
  interface Action {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
  }
}

const initialState = {
  categories: { categories: [] as Category[], count: 0 },
  loading: true,
  error: null,
};

const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase('GET_ALL_CATEGORIES_REQUEST', (state) => {
      state.loading = true;
    }),
      builder.addCase('GET_ALL_CATEGORIES_SUCCESS', (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      }),
      builder.addCase('GET_ALL_CATEGORIES_FAIL', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const categoriesReducer = slice.reducer;
