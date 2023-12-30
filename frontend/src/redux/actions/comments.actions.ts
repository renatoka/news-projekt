import axios from 'axios';
import {
  GET_ALL_COMMENTS_SUCCESS,
  GET_ALL_COMMENTS_FAIL,
  GET_ALL_COMMENTS_REQUEST,
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
} from '../constants/comments.constants';
import { Dispatch } from '@reduxjs/toolkit';
import { api } from '../api.service';

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

export const createComment =
  (data: { content: string; user_id: string }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: CREATE_COMMENT_REQUEST });
      const res = await api.post('/api/comments', data);
      const payload = await res.data;
      dispatch({ type: CREATE_COMMENT_SUCCESS, payload });
    } catch (error) {
      dispatch({ type: CREATE_COMMENT_FAILURE, payload: error });
    }
  };
