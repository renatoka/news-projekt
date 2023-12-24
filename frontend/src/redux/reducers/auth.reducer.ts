import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../../src/handlers/users/entities/user.entity';

declare module 'redux' {
  interface Action {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
  }
}

const registerUser = createSlice({
  name: 'register',
  initialState: {
    user: {} as User,
    success: false,
    error: null,
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
        state.error = action.payload;
      }),
      builder.addCase('REGISTER_ACCOUNT_RESET', (state) => {
        state.success = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export { registerUser };
