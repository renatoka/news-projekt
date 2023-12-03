import axios from 'axios';
import {
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,
  GET_ARTICLES_REQUEST,
  GET_ARTICLE_FAILURE,
  GET_ARTICLE_REQUEST,
  GET_ARTICLE_SUCCESS,
} from '../constants/articles.constants';
import { Dispatch } from '@reduxjs/toolkit';

export const getArticles =
  ({ category }: { category?: string }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_ARTICLES_REQUEST });
      const res = await axios.get('/api/articles', {
        params: { category },
      });
      const data = await res.data;
      dispatch({ type: GET_ARTICLES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_ARTICLES_FAILURE, payload: error });
    }
  };

export const getArticle = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_ARTICLE_REQUEST });
    const res = await axios.get(`/api/articles/${id}`);
    const data = await res.data;
    dispatch({ type: GET_ARTICLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ARTICLE_FAILURE, payload: error });
  }
};
