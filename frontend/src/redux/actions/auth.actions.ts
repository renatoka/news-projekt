import axios from 'axios';
import {
  REGISTER_ACCOUNT_FAILURE,
  REGISTER_ACCOUNT_REQUEST,
  REGISTER_ACCOUNT_SUCCESS,
} from '../constants/auth.constants';
import { Dispatch } from '@reduxjs/toolkit';

export const registerAccount =
  (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role_id: number;
  }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: REGISTER_ACCOUNT_REQUEST });
      const res = await axios.post('/api/auth/signup', data);
      const payload = await res.data;
      dispatch({ type: REGISTER_ACCOUNT_SUCCESS, payload });
    } catch (error) {
      dispatch({ type: REGISTER_ACCOUNT_FAILURE, payload: error });
    }
  };
