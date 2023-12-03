import axios from 'axios';
import {
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_FAIL,
} from '../constants/categories.constants';
import { Dispatch } from '@reduxjs/toolkit';

export const getAllCategories = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_ALL_CATEGORIES_REQUEST });
    const res = await axios.get('/api/categories');
    const data = await res.data;
    dispatch({ type: GET_ALL_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_CATEGORIES_FAIL, payload: error });
  }
};
