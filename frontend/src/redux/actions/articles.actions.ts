import axios from 'axios';
import {
  GET_ARTICLES_ADMIN_REQUEST,
  GET_ARTICLES_ADMIN_SUCCESS,
  GET_ARTICLES_ADMIN_FAILURE,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,
  GET_ARTICLES_REQUEST,
  GET_ARTICLE_FAILURE,
  GET_ARTICLE_REQUEST,
  GET_ARTICLE_SUCCESS,
  REVIEW_ARTICLE_REQUEST,
  REVIEW_ARTICLE_FAILURE,
  REVIEW_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILURE,
  CREATE_ARTICLE_REQUEST,
  CREATE_ARTICLE_SUCCESS,
} from '../constants/articles.constants';
import { Dispatch } from '@reduxjs/toolkit';
import { api } from '../api.service';

export const getArticles =
  ({
    category,
    title,
    approval_state,
    page,
    limit,
  }: {
    category?: string;
    title?: string;
    approval_state?: 'approved' | 'pending' | 'rejected' | 'all';
    page?: number;
    limit?: number;
  }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_ARTICLES_REQUEST });
      const res = await axios.get('/api/articles', {
        params: { category, title, approval_state, page, limit },
      });
      const data = await res.data;
      dispatch({ type: GET_ARTICLES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_ARTICLES_FAILURE, payload: error });
    }
  };

export const getArticlesAdmin =
  ({
    category,
    title,
    approval_state,
    page,
    limit,
  }: {
    category?: string;
    title?: string;
    approval_state?: 'approved' | 'pending' | 'rejected' | 'all';
    page?: number;
    limit?: number;
  }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_ARTICLES_ADMIN_REQUEST });
      const res = await api.get('/api/articles/admin-panel', {
        params: { category, title, approval_state, page, limit },
      });
      const data = await res.data;
      dispatch({ type: GET_ARTICLES_ADMIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_ARTICLES_ADMIN_FAILURE, payload: error });
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

export const reviewArticle =
  (id: number, approval_state: 'approved' | 'rejected') =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: REVIEW_ARTICLE_REQUEST });
      const res = await api.patch(`/api/articles/${id}`, { approval_state });
      const data = await res.data;
      dispatch({ type: REVIEW_ARTICLE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: REVIEW_ARTICLE_FAILURE, payload: error });
    }
  };

export const createArticle =
  ({
    title,
    description,
    content,
    image,
    category_id,
    user_id,
  }: {
    title: string;
    description: string;
    content: string;
    image: string;
    category_id: string;
    user_id: string;
  }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: CREATE_ARTICLE_REQUEST });
      const res = await api.post('/api/articles', {
        title,
        description,
        content,
        image,
        category_id,
        approval_state: 'pending',
        user_id,
      });
      const data = await res.data;
      dispatch({ type: CREATE_ARTICLE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CREATE_ARTICLE_FAILURE, payload: error });
    }
  };
