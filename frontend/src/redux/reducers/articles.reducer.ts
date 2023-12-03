import { createSlice } from '@reduxjs/toolkit';

declare module 'redux' {
  interface Action {
    payload?: any;
  }
}

const getAllArticles = createSlice({
  name: 'articles',
  initialState: {
    articles: { articles: [], count: 0 },
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase('GET_ARTICLES_REQUEST', (state) => {
      state.loading = true;
    }),
      builder.addCase('GET_ARTICLES_SUCCESS', (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      }),
      builder.addCase('GET_ARTICLES_FAILURE', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const getOneArticle = createSlice({
  name: 'article',
  initialState: {
    article: {},
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase('GET_ARTICLE_REQUEST', (state) => {
      state.loading = true;
    }),
      builder.addCase('GET_ARTICLE_SUCCESS', (state, action) => {
        state.loading = false;
        state.article = action.payload;
      }),
      builder.addCase('GET_ARTICLE_FAILURE', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export { getAllArticles, getOneArticle };
