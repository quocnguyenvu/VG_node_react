import { put, takeEvery } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import { toastError, toastSuccess, toastWarning } from '../../util/toast';
import axiosClient from '../config/axiosClient';

import {
  ADD_CART,
  ADD_CART_FAIL,
  ADD_CART_SUCCESS,
  UPDATE_CART,
  UPDATE_CART_FAIL,
  UPDATE_CART_SUCCESS,
  DELETE_CART,
  DELETE_CART_FAIL,
  DELETE_CART_SUCCESS,
  CLEAR_CART,
  CLEAR_CART_FAIL,
  CLEAR_CART_SUCCESS,
  GET_CART,
  GET_CART_FAIL,
  GET_CART_SUCCESS,
} from '../constants';

function* addCartSaga(action) {
  try {
    const { status, error, data } = yield axiosClient.post(`user/cartDetail`, action.payload);

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }

    yield put({
      type: ADD_CART_SUCCESS,
      payload: data.cartDetails,
    });

    if (data.warningMessage) {
      toastWarning(data.warningMessage, 'top-right', 2500);
    } else toastSuccess('Thêm vào giỏ hàng thành công!');
  } catch (error) {
    yield put({
      type: ADD_CART_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* updateCartSaga(action) {
  try {
    const { id, quantity, productId } = action.payload;
    const { status, error, data } = yield axiosClient.patch(`user/cartDetail/${id}`, {
      productId,
      quantity,
    });

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }

    yield put({
      type: UPDATE_CART_SUCCESS,
      payload: data.cartDetail,
    });
  } catch (error) {
    yield put({
      type: UPDATE_CART_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* deleteCartSaga(action) {
  try {
    const { id } = action.payload;
    const { status, error, data } = yield axiosClient.delete(`user/cartDetail/${id}`);

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }
    toastSuccess(data.message);
    yield put({
      type: DELETE_CART_SUCCESS,
      payload: { cartDetailId: id },
    });
  } catch (error) {
    yield put({
      type: DELETE_CART_FAIL,
      payload: error,
    });
    toastError(error);
  }
}

function* clearCartSaga(action) {
  try {
    const { cartId } = action.payload;
    const { status, error, data } = yield axiosClient.delete(`user/cart/${cartId}`);

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }

    toastSuccess(data.message);

    yield put({
      type: CLEAR_CART_SUCCESS,
      payload: [],
    });
  } catch (error) {
    yield put({
      type: CLEAR_CART_FAIL,
      payload: error,
    });
    toastSuccess(error);
  }
}

function* getCartDataSaga() {
  try {
    const { status, error, data } = yield axiosClient({
      method: 'GET',
      url: `/user/cart`,
    });

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }

    yield put({
      type: GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_CART_FAIL,
      payload: error,
    });
    toastError(error);
  }
}

export default function* cartSaga() {
  yield takeEvery(ADD_CART, addCartSaga);
  yield takeEvery(UPDATE_CART, updateCartSaga);
  yield takeEvery(DELETE_CART, deleteCartSaga);
  yield takeEvery(CLEAR_CART, clearCartSaga);
  yield takeEvery(GET_CART, getCartDataSaga);
}
