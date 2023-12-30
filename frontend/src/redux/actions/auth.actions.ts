import axios from 'axios';
import {
  REGISTER_ACCOUNT_FAILURE,
  REGISTER_ACCOUNT_REQUEST,
  REGISTER_ACCOUNT_SUCCESS,
  LOGIN_ACCOUNT_FAILURE,
  LOGIN_ACCOUNT_REQUEST,
  LOGIN_ACCOUNT_SUCCESS,
  USER_DATA_FAILURE,
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
  USER_DATA_RESET,
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

export const loginAccount =
  (data: { email: string; password: string }) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: LOGIN_ACCOUNT_REQUEST });
      const res = await axios.post('/api/auth/signin', data);
      const payload = await res.data;
      dispatch({ type: LOGIN_ACCOUNT_SUCCESS, payload });
    } catch (error) {
      dispatch({ type: LOGIN_ACCOUNT_FAILURE, payload: error });
    }
  };

export const logoutAccount = () => async (dispatch: Dispatch) => {
  try {
    localStorage.setItem('access_token', '');
    dispatch({ type: USER_DATA_RESET });
  } catch (error) {
    console.log(error);
  }
};

export const getRoleById = (id: number) => async () => {
  try {
    const res = await axios.get(`/api/roles/${id}`);
    const payload = await res.data;
    return payload;
  } catch (error) {
    console.log(error);
  }
};

export const getTokenData = (token: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: USER_DATA_REQUEST });
    const res = await axios.get('/api/auth/get-token-data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        token,
      },
    });
    const payload = await res.data;
    dispatch({ type: USER_DATA_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: USER_DATA_FAILURE, payload: error });
    console.log(error);
  }
};
