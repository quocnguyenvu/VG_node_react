import { put, takeEvery } from '@redux-saga/core/effects';
import { all } from 'redux-saga/effects';
import history from '../../util/history';
import { toastError, toastSuccess } from '../../util/toast';
import axiosClient from '../config/axiosClient';

import {
  CREATE_CATEGORY,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_SUCCESS,
  GET_CATEGORY,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_SUCCESS,
  GET_SIDEBAR,
  GET_SIDEBAR_FAIL,
  GET_SIDEBAR_SUCCESS,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_SUCCESS,
} from '../constants';

function* getCategorySaga() {
  try {
    const { data, status, error } = yield axiosClient({
      method: 'GET',
      url: `/user/Category`,
    });

    if (status === 'failed' && error) throw new Error(error.message);

    yield put({
      type: GET_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_CATEGORY_FAIL,
      payload: error,
    });
  }
}

function* getSidebarSaga() {
  try {
    const [responseCategory, responseTags] = yield all([
      axiosClient({
        method: 'GET',
        url: `/user/Category`,
      }),
      axiosClient({
        method: 'GET',
        url: `/user/tags`,
      }),
    ]);

    if (
      (responseCategory.status === 'failed' && responseCategory.error) ||
      (responseTags.status === 'failed' && responseTags.error)
    )
      throw new Error(responseTags.error);

    const data = {
      categoryData: responseCategory.data.categories,
      tagsData: responseTags.data.tags,
    };

    yield put({
      type: GET_SIDEBAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_SIDEBAR_FAIL,
      payload: error,
    });
  }
}

function* createCategorySaga(action) {
  const values = action.payload;
  delete values.origin;

  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    if (key === 'img') {
      for (let img of values.img) {
        formData.append('img', img);
      }
    } else {
      formData.append(key, values[key]);
    }
  });

  try {
    const { status, error, data } = yield axiosClient.post(`/admin/category`, formData);

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }

    yield put({
      type: CREATE_CATEGORY_SUCCESS,
      payload: data.categories,
    });
    toastSuccess(data.message);
    history.push('/admin/category');
  } catch (error) {
    yield put({
      type: CREATE_CATEGORY_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* deleteCategorySaga(action) {
  try {
    const { id } = action.payload;
    const { status, error, data } = yield axiosClient.delete(`/admin/Category/${id}`);

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }
    yield put({
      type: DELETE_CATEGORY_SUCCESS,
      payload: id,
    });
    toastSuccess(data.message);
  } catch (error) {
    yield put({
      type: DELETE_CATEGORY_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* updateCategorySaga(action) {
  try {
    const { id } = action.payload;

    const { status, error, data } = yield axiosClient.patch(`admin/category/${id}`, {
      ...action.payload,
    });
    if (status === 'failed' && error) {
      throw new Error(error.message);
    }

    if (status === 'success' && data) {
      toastSuccess(data.message);
    }
    yield put({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data,
    });

    yield history.push('/admin/category');
  } catch (error) {
    yield put({
      type: UPDATE_CATEGORY_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

export default function* categorySaga() {
  yield takeEvery(CREATE_CATEGORY, createCategorySaga);
  yield takeEvery(GET_CATEGORY, getCategorySaga);
  yield takeEvery(GET_SIDEBAR, getSidebarSaga);
  yield takeEvery(UPDATE_CATEGORY, updateCategorySaga);
  yield takeEvery(DELETE_CATEGORY, deleteCategorySaga);
}
