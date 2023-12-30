import { createSlice } from '@reduxjs/toolkit';
import { Article } from '../../../../src/handlers/articles/entities/article.entity';

declare module 'redux' {
  interface Action {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
  }
}

const getAllArticles = createSlice({
  name: 'articles',
  initialState: {
    articles: { articles: [], count: 0 },
    loading: false,
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

const getAllArticlesAdmin = createSlice({
  name: 'articlesAdmin',
  initialState: {
    articles: { articles: [], count: 0 },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase('GET_ARTICLES_ADMIN_REQUEST', (state) => {
      state.loading = true;
    }),
      builder.addCase('GET_ARTICLES_ADMIN_SUCCESS', (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      }),
      builder.addCase('GET_ARTICLES_ADMIN_FAILURE', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const getOneArticle = createSlice({
  name: 'article',
  initialState: {
    article: {} as Article,
    loading: false,
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

const reviewArticle = createSlice({
  name: 'review',
  initialState: {
    articles: { articles: [], count: 0 },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase('REVIEW_ARTICLE_REQUEST', (state) => {
      state.loading = true;
    }),
      builder.addCase('REVIEW_ARTICLE_SUCCESS', (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      }),
      builder.addCase('REVIEW_ARTICLE_FAILURE', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const createArticle = createSlice({
  name: 'createArticle',
  initialState: {
    article: {} as Article,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase('CREATE_ARTICLE_REQUEST', (state) => {
      state.loading = true;
    }),
      builder.addCase('CREATE_ARTICLE_SUCCESS', (state, action) => {
        state.loading = false;
        state.article = action.payload;
        state.success = true;
      }),
      builder.addCase('CREATE_ARTICLE_FAILURE', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      }),
      builder.addCase('CREATE_ARTICLE_RESET', (state) => {
        state.article = {} as any;
        state.loading = false;
        state.error = null;
        state.success = false;
      });
  },
});

export {
  getAllArticles,
  getOneArticle,
  reviewArticle,
  getAllArticlesAdmin,
  createArticle,
};
