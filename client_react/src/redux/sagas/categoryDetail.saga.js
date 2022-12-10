import { put, takeEvery } from '@redux-saga/core/effects';
import { all } from 'redux-saga/effects';
import { toastError } from '../../util/toast';
import axiosClient from '../config/axiosClient';
import {
  GET_CATEGORY_DETAIL,
  GET_CATEGORY_DETAIL_FAIL,
  GET_CATEGORY_DETAIL_SUCCESS,
} from '../constants';

function* getCategoryDetailSaga(action) {
  const categoryId = action.payload;

  try {
    const [response, responseNew] = yield all([
      axiosClient({
        method: 'GET',
        url: `admin/Category/${categoryId}`,
      }),
      axiosClient({
        method: 'GET',
        url: `admin/Category?isNew=true`,
      }),
    ]);

    if (
      (response.status === 'failed' && response.error) ||
      (responseNew.status === 'failed' && responseNew.error)
    )
      throw new Error(response.error.message);

    const data = {
      category: response.data.category,
    };

    yield put({
      type: GET_CATEGORY_DETAIL_SUCCESS,
      payload: {
        data: data,
      },
    });
  } catch (error) {
    yield put({
      type: GET_CATEGORY_DETAIL_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

export default function* categoryDetailSaga() {
  yield takeEvery(GET_CATEGORY_DETAIL, getCategoryDetailSaga);
}
