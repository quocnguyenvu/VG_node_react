import { put, takeEvery } from '@redux-saga/core/effects';
import axiosClient from '../config/axiosClient';
import { toastSuccess, toastError } from '../../util/toast';
import history from '../../util/history';

import {
  GET_DISCOUNT,
  GET_DISCOUNT_SUCCESS,
  GET_DISCOUNT_FAIL,
  CREATE_DISCOUNT,
  CREATE_DISCOUNT_FAIL,
  CREATE_DISCOUNT_SUCCESS,
  GET_DISCOUNT_USER,
  GET_DISCOUNT_USER_FAIL,
  GET_DISCOUNT_USER_SUCCESS,
  GET_ALL_DISCOUNT_USER,
  GET_ALL_DISCOUNT_USER_FAIL,
  GET_ALL_DISCOUNT_USER_SUCCESS,
  DELETE_DISCOUNT,
  DELETE_DISCOUNT_FAIL,
  DELETE_DISCOUNT_SUCCESS,
  ADD_DISCOUNT_USER,
  ADD_DISCOUNT_USER_FAIL,
  ADD_DISCOUNT_USER_SUCCESS,
} from '../constants';

function* getDiscountSaga(action) {
  try {
    const { page, limit, searchKey } = action.payload;
    const { status, error, data } = yield axiosClient({
      method: 'get',
      url: '/admin/discountCode',
      params: {
        ...(page && { page }),
        ...(limit && { limit }),
        ...(searchKey && { q: searchKey }),
      },
    });

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }

    yield put({
      type: GET_DISCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_DISCOUNT_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* getDiscountUserSaga(action) {
  try {
    const { page, limit, searchKey } = action.payload;
    const { status, error, data } = yield axiosClient({
      method: 'get',
      url: `/user/discountCodeDetail`,
      params: {
        ...(page && { page }),
        ...(limit && { limit }),
        ...(searchKey && { q: searchKey }),
      },
    });

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }
    yield put({
      type: GET_DISCOUNT_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_DISCOUNT_USER_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* getAllDiscountUserSaga(action) {
  try {
    const { page, limit, searchKey } = action.payload;
    const { status, error, data } = yield axiosClient({
      method: 'get',
      url: `/user/discountCode`,
      params: {
        ...(page && { page }),
        ...(limit && { limit }),
        ...(searchKey && { q: searchKey }),
      },
    });

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }
    yield put({
      type: GET_ALL_DISCOUNT_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_ALL_DISCOUNT_USER_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* createDiscountSaga(action) {
  try {
    const { status, error, data } = yield axiosClient.post(`/admin/discountCode`, {
      ...action.payload,
    });

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }

    yield put({
      type: CREATE_DISCOUNT_SUCCESS,
      payload: data.discountCode,
    });
    toastSuccess(data.message);
    history.push('/admin/discount');
  } catch (error) {
    yield put({
      type: CREATE_DISCOUNT_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* deleteDiscountSaga(action) {
  try {
    const { id } = action.payload;
    const { status, error, data } = yield axiosClient.delete(`/admin/discountCode/${id}`);

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }
    yield put({
      type: DELETE_DISCOUNT_SUCCESS,
      payload: id,
    });
    toastSuccess(data.message);
  } catch (error) {
    yield put({
      type: DELETE_DISCOUNT_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* addDiscountUserSaga(action) {
  try {
    const { id } = action.payload;
    const { status, error, data } = yield axiosClient.post(`/user/discountCodeDetail/${id}`);

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }
    yield put({
      type: ADD_DISCOUNT_USER_SUCCESS,
      payload: data,
    });
    toastSuccess(data.message);
  } catch (error) {
    yield put({
      type: ADD_DISCOUNT_USER_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

export default function* discountSaga() {
  yield takeEvery(GET_DISCOUNT, getDiscountSaga);
  yield takeEvery(CREATE_DISCOUNT, createDiscountSaga);
  yield takeEvery(GET_DISCOUNT_USER, getDiscountUserSaga);
  yield takeEvery(GET_ALL_DISCOUNT_USER, getAllDiscountUserSaga);
  yield takeEvery(DELETE_DISCOUNT, deleteDiscountSaga);
  yield takeEvery(ADD_DISCOUNT_USER, addDiscountUserSaga);
}
