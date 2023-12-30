import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from './reducers/categories.actions';
import {
  createArticle,
  getAllArticles,
  getAllArticlesAdmin,
  getOneArticle,
} from './reducers/articles.reducer';
import {
  getAllUsers,
  getOneUser,
  updateOneUser,
} from './reducers/users.reducer';
import { createComment, getAllComments } from './reducers/comments.reducer';
import {
  loggedUser,
  loginAccount,
  registerUser,
} from './reducers/auth.reducer';

export const store = configureStore({
  reducer: {
    articles: getAllArticles.reducer,
    articlesAdmin: getAllArticlesAdmin.reducer,
    article: getOneArticle.reducer,
    createArticle: createArticle.reducer,
    categories: categoriesReducer,
    users: getAllUsers.reducer,
    user: getOneUser.reducer,
    updateOneUser: updateOneUser.reducer,
    comments: getAllComments.reducer,
    createComment: createComment.reducer,
    register: registerUser.reducer,
    login: loginAccount.reducer,
    loggedUser: loggedUser.reducer,
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
