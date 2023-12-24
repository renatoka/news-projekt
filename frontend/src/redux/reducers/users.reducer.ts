import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../../src/handlers/users/entities/user.entity';

declare module 'redux' {
  interface Action {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
  }
}

const getAllUsers = createSlice({
  name: 'users',
  initialState: {
    users: { users: [], count: 0 },
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase('GET_USERS_REQUEST', (state) => {
      state.loading = true;
    }),
      builder.addCase('GET_USERS_SUCCESS', (state, action) => {
        state.loading = false;
        state.users = action.payload;
      }),
      builder.addCase('GET_USERS_FAILURE', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const getOneUser = createSlice({
  name: 'user',
  initialState: {
    user: {} as User,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase('GET_USER_REQUEST', (state) => {
      state.loading = true;
    }),
      builder.addCase('GET_USER_SUCCESS', (state, action) => {
        state.loading = false;
        state.user = action.payload;
      }),
      builder.addCase('GET_USER_FAILURE', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const updateOneUser = createSlice({
  name: 'updateOneUser',
  initialState: {
    success: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase('UPDATE_USER_REQUEST', (state) => {
      state.loading = true;
    }),
      builder.addCase('UPDATE_USER_SUCCESS', (state) => {
        state.success = true;
        state.loading = false;
      }),
      builder.addCase('UPDATE_USER_FAILURE', (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload;
      });
    builder.addCase('UPDATE_USER_RESET', (state) => {
      state.success = false;
      state.loading = false;
      state.error = null;
    });
  },
});

export { getAllUsers, getOneUser, updateOneUser };
