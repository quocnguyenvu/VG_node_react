import { put, takeEvery } from '@redux-saga/core/effects';
import { toastError } from '../../util/toast';
import axiosClient from '../config/axiosClient';

import { GET_MASTER_DATA, GET_MASTER_DATA_SUCCESS, GET_MASTER_DATA_FAIL } from '../constants';

function* getMasterDataSaga() {
  try {
    const { status, error, data } = yield axiosClient({
      method: 'GET',
      url: `admin/statistical`,
    });

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }

    yield put({
      type: GET_MASTER_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_MASTER_DATA_FAIL,
      payload: error,
    });
    toastError(error);
  }
}

export default function* dashboardSaga() {
  yield takeEvery(GET_MASTER_DATA, getMasterDataSaga);
}
