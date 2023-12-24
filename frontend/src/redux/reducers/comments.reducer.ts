import { createSlice } from '@reduxjs/toolkit';

declare module 'redux' {
  interface Action {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
  }
}

const getAllComments = createSlice({
  name: 'comments',
  initialState: {
    comments: { comments: [], count: 0 },
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase('GET_ALL_COMMENTS_REQUEST', (state) => {
      state.loading = true;
    }),
      builder.addCase('GET_ALL_COMMENTS_SUCCESS', (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      }),
      builder.addCase('GET_ALL_COMMENTS_FAIL', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export { getAllComments };
