import axios from 'axios';
import {
  GET_ALL_COMMENTS_SUCCESS,
  GET_ALL_COMMENTS_FAIL,
  GET_ALL_COMMENTS_REQUEST,
} from '../constants/comments.constants';
import { Dispatch } from '@reduxjs/toolkit';

export const getComments = (query: any) => async (dispatch: Dispatch) => {
  try {
    const { page, limit, sort, order } = query;
    dispatch({ type: GET_ALL_COMMENTS_REQUEST });
    const res = await axios.get('/api/comments', {
      params: {
        page,
        limit,
        sort,
        order,
      },
    });
    const data = await res.data;
    dispatch({ type: GET_ALL_COMMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_COMMENTS_FAIL, payload: error });
  }
};
