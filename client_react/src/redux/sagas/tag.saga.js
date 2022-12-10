import { put, takeEvery } from '@redux-saga/core/effects';
import history from '../../util/history';
import { toastError, toastSuccess } from '../../util/toast';
import axiosClient from '../config/axiosClient';

import {
  CREATE_TAG,
  CREATE_TAG_FAIL,
  CREATE_TAG_SUCCESS,
  DELETE_TAG,
  DELETE_TAG_FAIL,
  DELETE_TAG_SUCCESS,
  GET_TAG,
  GET_TAG_FAIL,
  GET_TAG_SUCCESS,
  UPDATE_TAG,
  UPDATE_TAG_FAIL,
  UPDATE_TAG_SUCCESS,
} from '../constants';

function* getTagSaga() {
  try {
    const { data, status, error } = yield axiosClient({
      method: 'GET',
      url: `/user/tags`,
    });

    if (status === 'failed' && error) throw new Error(error.message);

    yield put({
      type: GET_TAG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_TAG_FAIL,
      payload: error,
    });
  }
}

function* createTagSaga(action) {
  try {
    const { status, error, data } = yield axiosClient.post(`/admin/tags`, {
      ...action.payload,
    });

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }

    yield put({
      type: CREATE_TAG_SUCCESS,
      payload: data.tag,
    });
    toastSuccess(data.message);
    history.push('/admin/tag');
  } catch (error) {
    yield put({
      type: CREATE_TAG_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* deleteTagSaga(action) {
  try {
    const { id } = action.payload;
    const { status, error, data } = yield axiosClient.delete(`/admin/tags/${id}`);

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }
    yield put({
      type: DELETE_TAG_SUCCESS,
      payload: id,
    });
    toastSuccess(data.message);
  } catch (error) {
    yield put({
      type: DELETE_TAG_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* updateTagSaga(action) {
  try {
    const { id, name } = action.payload;

    const { status, error, data } = yield axiosClient.patch(`admin/tags/${id}`, {
      name,
    });
    if (status === 'failed' && error) {
      throw new Error(error.message);
    }

    if (status === 'success' && data) {
      toastSuccess(data.message);
    }
    yield put({
      type: UPDATE_TAG_SUCCESS,
      payload: data,
    });

    yield history.push('/admin/tag');
  } catch (error) {
    yield put({
      type: UPDATE_TAG_FAIL,
      payload: error,
    });
  }
}

export default function* tagSaga() {
  yield takeEvery(GET_TAG, getTagSaga);
  yield takeEvery(CREATE_TAG, createTagSaga);
  yield takeEvery(DELETE_TAG, deleteTagSaga);
  yield takeEvery(UPDATE_TAG, updateTagSaga);
}
