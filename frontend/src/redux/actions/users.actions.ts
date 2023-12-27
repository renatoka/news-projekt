import axios from 'axios';
import {
  GET_USERS_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from '../constants/users.constants';
import { Dispatch } from '@reduxjs/toolkit';
import { api } from '../api.service';

export const getUser = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });
    const res = await api.get(`/api/users/${id}`);
    const data = await res.data;
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error });
  }
};

export const getUsers = (query: any) => async (dispatch: Dispatch) => {
  try {
    const { page, limit, sort, order, username, email, roleId } = query;
    dispatch({ type: GET_USERS_REQUEST });
    const res = await axios.get(`/api/users`, {
      params: {
        page,
        limit,
        sort,
        order,
        username,
        email,
        roleId,
      },
    });
    const data = await res.data;
    dispatch({ type: GET_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USERS_FAILURE, payload: error });
  }
};

export const updateUser =
  (id: string, data: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
      await api.patch(`/api/users/${id}`, data);
      dispatch({ type: UPDATE_USER_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_USER_FAILURE, payload: error });
    }
  };
