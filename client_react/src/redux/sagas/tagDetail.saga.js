import { put, takeEvery } from '@redux-saga/core/effects';
import axiosClient from '../config/axiosClient';
import { all } from 'redux-saga/effects';
import { GET_TAG_DETAIL, GET_TAG_DETAIL_FAIL, GET_TAG_DETAIL_SUCCESS } from '../constants';
import { toastError } from '../../util/toast';

function* getTagDetailSaga(action) {
  const tagId = action.payload;

  try {
    const [response, responseNew] = yield all([
      axiosClient({
        method: 'GET',
        url: `user/tags/${tagId}`,
      }),
      axiosClient({
        method: 'GET',
        url: `user/tags?isNew=true`,
      }),
    ]);

    if (
      (response.status === 'failed' && response.error) ||
      (responseNew.status === 'failed' && responseNew.error)
    )
      throw new Error(response.error.message);

    const data = {
      tag: response.data.tag,
    };

    yield put({
      type: GET_TAG_DETAIL_SUCCESS,
      payload: {
        data: data,
      },
    });
  } catch (error) {
    yield put({
      type: GET_TAG_DETAIL_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

export default function* tagDetailSaga() {
  yield takeEvery(GET_TAG_DETAIL, getTagDetailSaga);
}
