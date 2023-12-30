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

const createComment = createSlice({
  name: 'createComment',
  initialState: {
    comment: {},
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase('CREATE_COMMENT_REQUEST', (state) => {
      state.loading = true;
    }),
      builder.addCase('CREATE_COMMENT_SUCCESS', (state, action) => {
        state.loading = false;
        state.comment = action.payload;
        state.success = true;
      }),
      builder.addCase('CREATE_COMMENT_FAILURE', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      }),
      builder.addCase('CREATE_COMMENT_RESET', (state) => {
        state.comment = {};
        state.loading = false;
        state.error = null;
        state.success = false;
      });
  },
});

export { getAllComments, createComment };
