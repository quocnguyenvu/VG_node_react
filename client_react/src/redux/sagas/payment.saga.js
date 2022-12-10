import { put, takeEvery } from '@redux-saga/core/effects';
import axios from 'axios';
import { all } from 'redux-saga/effects';
import history from '../../util/history';
import { toastError, toastSuccess } from '../../util/toast';
import axiosClient from '../config/axiosClient';

import {
  CREATE_BILL,
  CREATE_BILL_FAIL,
  CREATE_BILL_SUCCESS,
  DELETE_PAYMENTS,
  DELETE_PAYMENTS_FAIL,
  DELETE_PAYMENTS_SUCCESS,
  GET_BILL,
  GET_BILL_FAIL,
  GET_BILL_SUCCESS,
  GET_ORDER_DETAIL,
  GET_ORDER_DETAIL_FAIL,
  GET_ORDER_DETAIL_SUCCESS,
  GET_PAYMENTS,
  GET_PAYMENTS_FAIL,
  GET_PAYMENTS_SUCCESS,
  UPDATE_BILL,
  UPDATE_BILL_FAIL,
  UPDATE_BILL_SUCCESS,
  UPDATE_PAYMENTS,
  UPDATE_PAYMENTS_FAIL,
  GET_ORDER_USER,
  GET_ORDER_USER_SUCCESS,
  GET_ORDER_USER_FAIL,
  CANCEL_ORDER,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
  GET_BILL_DETAIL_USER,
  GET_BILL_DETAIL_USER_SUCCESS,
  GET_BILL_DETAIL_USER_FAIL,
  UPDATE_PAYMENTS_SUCCESS,
} from '../constants';

const apiURL = process.env.REACT_APP_API_URL;

function* createBillSaga(action) {
  try {
    const response = yield axiosClient.post('/user/bill', action.payload);

    if (response.status === 'failed' && response.error) throw new Error(response.error.message);

    const data = response.data;

    yield put({
      type: CREATE_BILL_SUCCESS,
      payload: data,
    });

    toastSuccess('Đặt hàng thành công!', 'top-right', 1500);
    setTimeout(() => {
      history.push(`/success/${data.bill.id}`);
    }, 2000);
  } catch (error) {
    yield put({
      type: CREATE_BILL_FAIL,
      payload: error,
    });

    toastError(error.message);
  }
}

function* updateBillSaga(action) {
  try {
    const { id, type, user, cartId, ...other } = action.payload;
    let response;
    if (type === 'success') {
      [response] = yield all([
        axios.patch(`${apiURL}/payments/${id}`, { ...other }),
        axios.delete(`${apiURL}/carts/${cartId}`),
      ]);
    } else {
      response = axios.patch(`${apiURL}/payments/${id}`, {
        ...other,
      });
    }

    const data = response.data;
    yield put({
      type: UPDATE_BILL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: UPDATE_BILL_FAIL,
      payload: error,
    });
  }
}

function* getBillUserSaga(action) {
  try {
    const { billId } = action.payload;

    const response = yield axiosClient({
      method: 'GET',
      url: `user/bill/${billId}`,
    });

    if (response.status === 'failed' && response.error) throw new Error(response.error.message);

    const data = response.data;

    yield put({
      type: GET_BILL_SUCCESS,
      payload: {
        data: data,
        total: response.data.total,
      },
    });
  } catch (error) {
    yield put({
      type: GET_BILL_FAIL,
      payload: error,
    });

    toastError(error.message);
  }
}

function* getPayments(action) {
  try {
    const { page, limit, search, status } = action.payload;

    const response = yield axiosClient({
      method: 'GET',
      url: `/admin/bill`,
      params: {
        ...(page && { _page: page }),
        ...(limit && { _limit: limit }),
        ...(search && { q: search }),
        ...(status && status !== 'Tất cả' ? { status: status } : { status: null }),
      },
    });

    if (response.status === 'failed' && response.error) throw new Error(response.error.message);

    const data = response.data;

    yield put({
      type: GET_PAYMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_PAYMENTS_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* deletePayments(action) {
  try {
    const { id } = action.payload;
    const response = yield axiosClient.delete(`/admin/bill/${id}`);

    if (response.status === 'failed' && response.error) throw new Error(response.error.message);

    const data = response.data;

    yield put({
      type: DELETE_PAYMENTS_SUCCESS,
      payload: data,
    });
    toastSuccess('Xóa đơn thành công!');
  } catch (error) {
    yield put({
      type: DELETE_PAYMENTS_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* updatePayments(action) {
  try {
    const { id, status } = action.payload;
    const response = yield axiosClient.patch(`/admin/bill/updateStatus/${id}`, {
      status,
    });

    if (response.status === 'failed' && response.error) throw new Error(response.error.message);

    const data = response.data;

    yield put({
      type: UPDATE_PAYMENTS_SUCCESS,
      payload: data,
    });
    toastSuccess('Cập nhật trạng thái thành công!');
  } catch (error) {
    yield put({
      type: UPDATE_PAYMENTS_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* getOrderDetail(action) {
  try {
    const { id } = action.payload;
    const response = yield axiosClient.get(`/admin/bill/${id}`);

    if (response.status === 'failed' && response.error) throw new Error(response.error.message);

    const data = response.data;

    yield put({
      type: GET_ORDER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_ORDER_DETAIL_FAIL,
      payload: error,
    });

    toastError(error.message);
  }
}

function* cancelOrderUserSaga(action) {
  try {
    const { billId, status } = action.payload;
    const response = yield axiosClient.patch(`user/bill/${billId}`, { status });

    if (response.status === 'failed' && response.error) throw new Error(response.error.message);

    const data = response.data;

    yield put({
      type: CANCEL_ORDER_SUCCESS,
      payload: {
        data: data,
      },
    });
    toastSuccess('Huỷ đơn thành công!');
  } catch (error) {
    yield put({
      type: CANCEL_ORDER_FAIL,
      payload: error,
    });

    toastError(error.message);
  }
}

function* getOrderUserSaga(action) {
  try {
    const { page, search, status, limit } = action.payload;

    const response = yield axiosClient({
      method: 'GET',
      url: `user/bill`,
      params: {
        ...(search && { q: search }),
        ...(limit && { _limit: limit }),
        ...(page && { _page: page }),
        ...(status && status !== 'all' && { status }),
      },
    });

    if (response.status === 'failed' && response.error) throw new Error(response.error.message);

    const data = response.data;

    yield put({
      type: GET_ORDER_USER_SUCCESS,
      payload: {
        data: data,
      },
    });
  } catch (error) {
    yield put({
      type: GET_ORDER_USER_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* getBillDetailUserSaga(action) {
  try {
    const billId = action.payload;

    const response = yield axiosClient.get(`/user/bill/${billId}`);

    if (response.status === 'failed' && response.error) throw new Error(response.error.message);

    const data = response.data;

    yield put({
      type: GET_BILL_DETAIL_USER_SUCCESS,
      payload: {
        data: data,
      },
    });
  } catch (error) {
    yield put({
      type: GET_BILL_DETAIL_USER_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

export default function* paymentSaga() {
  yield takeEvery(CREATE_BILL, createBillSaga);
  yield takeEvery(UPDATE_BILL, updateBillSaga);
  yield takeEvery(GET_BILL, getBillUserSaga);
  yield takeEvery(GET_PAYMENTS, getPayments);
  yield takeEvery(DELETE_PAYMENTS, deletePayments);
  yield takeEvery(UPDATE_PAYMENTS, updatePayments);
  yield takeEvery(GET_ORDER_DETAIL, getOrderDetail);
  yield takeEvery(GET_ORDER_USER, getOrderUserSaga);
  yield takeEvery(CANCEL_ORDER, cancelOrderUserSaga);
  yield takeEvery(GET_BILL_DETAIL_USER, getBillDetailUserSaga);
}
