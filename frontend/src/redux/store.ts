import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from './reducers/categories.actions';
import { getAllArticles, getOneArticle } from './reducers/articles.reducer';

export const store = configureStore({
  reducer: {
    articles: getAllArticles.reducer,
    article: getOneArticle.reducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
