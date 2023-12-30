import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../../src/handlers/users/entities/user.entity';

declare module 'redux' {
  interface Action {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
  }
}

interface UserExtended extends User {
  role_name: string;
}

const registerUser = createSlice({
  name: 'register',
  initialState: {
    user: {} as User,
    success: false,
    error: {
      message: '',
      error: '',
      statusCode: 0,
    },
    loading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase('REGISTER_ACCOUNT_REQUEST', (state) => {
      state.success = false;
      state.loading = true;
    }),
      builder.addCase('REGISTER_ACCOUNT_SUCCESS', (state, action) => {
        state.success = true;
        state.loading = false;
        state.user = action.payload;
      }),
      builder.addCase('REGISTER_ACCOUNT_FAILURE', (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload.response.data;
      }),
      builder.addCase('REGISTER_ACCOUNT_RESET', (state) => {
        state.success = false;
        state.loading = false;
        state.error = {
          message: '',
          error: '',
          statusCode: 0,
        };
      });
  },
});

const loginAccount = createSlice({
  name: 'login',
  initialState: {
    access_token: '',
    success: false,
    error: {
      message: '',
      error: '',
      statusCode: 0,
    },
    loading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase('LOGIN_ACCOUNT_REQUEST', (state) => {
      state.success = false;
      state.loading = true;
    }),
      builder.addCase('LOGIN_ACCOUNT_SUCCESS', (state, action) => {
        state.success = true;
        state.loading = false;
        state.access_token = action.payload;
      }),
      builder.addCase('LOGIN_ACCOUNT_FAILURE', (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload.response.data;
      }),
      builder.addCase('LOGIN_ACCOUNT_RESET', (state) => {
        state.access_token = '';
        state.success = false;
        state.loading = false;
        state.error = {
          message: '',
          error: '',
          statusCode: 0,
        };
      });
  },
});

const loggedUser = createSlice({
  name: 'loggedUser',
  initialState: {
    user: {} as UserExtended,
    success: false,
    error: {
      message: '',
      error: '',
      statusCode: 0,
    },
    loading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase('USER_DATA_REQUEST', (state) => {
      state.success = false;
      state.loading = true;
    }),
      builder.addCase('USER_DATA_SUCCESS', (state, action) => {
        state.success = true;
        state.loading = false;
        state.user = action.payload;
      }),
      builder.addCase('USER_DATA_FAILURE', (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload.response.data;
      }),
      builder.addCase('USER_DATA_RESET', (state) => {
        state.user = {} as any;
        state.success = false;
        state.loading = false;
        state.error = {
          message: '',
          error: '',
          statusCode: 0,
        };
      });
  },
});

export { registerUser, loginAccount, loggedUser };
