import { put, takeEvery } from '@redux-saga/core/effects';
import { all } from 'redux-saga/effects';
import history from '../../util/history';
import { toastError, toastSuccess } from '../../util/toast';
import axiosClient from '../config/axiosClient';
import {
  CREATE_PRODUCTS,
  CREATE_PRODUCTS_FAIL,
  CREATE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS,
  DELETE_PRODUCTS_FAIL,
  DELETE_PRODUCTS_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_HOME,
  GET_PRODUCT_HOME_FAIL,
  GET_PRODUCT_HOME_SUCCESS,
  UPDATE_PRODUCTS,
  UPDATE_PRODUCTS_FAIL,
  UPDATE_PRODUCTS_SUCCESS,
} from '../constants';

function* getProductHomeSaga() {
  try {
    const [responseNew, responseSale, responseSpecial] = yield all([
      axiosClient({
        method: 'GET',
        url: `user/products?isNew=true`,
      }),
      axiosClient({
        method: 'GET',
        url: `user/products?sale=true`,
      }),
      axiosClient({
        method: 'GET',
        url: `user/products?rate_gte=4`,
      }),
    ]);

    if (
      (responseNew.status === 'failed' && responseNew.error) ||
      (responseSale.status === 'failed' && responseSale.error) ||
      (responseSpecial.status === 'failed' && responseSpecial.error)
    ) {
      throw new Error(responseNew.message);
    }

    const data = {
      new: responseNew.data.products,
      sale: responseSale.data.products,
      special: responseSpecial.data.products,
    };

    yield put({
      type: GET_PRODUCT_HOME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_PRODUCT_HOME_FAIL,
      payload: error,
    });
    toastError(error);
  }
}

function* getProductSaga(action) {
  try {
    const { page, limit, category, price, tag, sort, searchKey } = action.payload;
    const { status, error, data } = yield axiosClient({
      method: 'GET',
      url: `user/products`,
      params: {
        ...(page && { _page: page }),
        ...(limit && { _limit: limit }),
        ...(category && { categoryId: category }),
        ...(price && { price_gte: price[0], price_lte: price[1] }),
        ...(tag && { tagId: tag }),
        ...(sort === 'bestSelling' && { _sort: 'sale', _order: 'asc' }),
        ...(sort === 'priceLowToHigh' && { _sort: 'price', _order: 'asc' }),
        ...(sort === 'priceHighToLow' && { _sort: 'price', _order: 'desc' }),
        ...(sort === 'news' && { new: true }),
        ...(sort === 'hot' && { hot: true }),
        ...(searchKey && { q: searchKey }),
      },
    });

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }

    yield put({
      type: GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_PRODUCTS_FAIL,
      payload: error,
    });
    toastError(error);
  }
}

function* createProductSaga(action) {
  const values = action.payload;
  delete values.origin;

  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    if (key === 'imgs') {
      for (let imgs of values.imgs) {
        formData.append('imgs', imgs);
      }
    } else {
      formData.append(key, values[key]);
    }
  });

  try {
    const { status, error, data } = yield axiosClient.post(`admin/products`, formData);
    if (status === 'failed' && error) {
      throw new Error(error.message);
    }

    if (status === 'success' && data) {
      toastSuccess(data.message);
    }

    yield put({
      type: CREATE_PRODUCTS_SUCCESS,
      payload: data.products,
    });
    toastSuccess(data.message);
    yield history.push('/admin/products');
  } catch (error) {
    toastError(error.message);
    yield put({
      type: CREATE_PRODUCTS_FAIL,
      payload: error,
    });
  }
}

function* updateProductSaga(action) {
  try {
    const { id, ...other } = action.payload;

    const { status, error, data } = yield axiosClient.patch(`admin/products/${id}`, {
      ...other,
    });
    if (status === 'failed' && error) {
      throw new Error(error.message);
    }

    if (status === 'success' && data) {
      toastSuccess(data.message);
    }
    yield put({
      type: UPDATE_PRODUCTS_SUCCESS,
      payload: data,
    });

    yield history.push('/admin/products');
  } catch (error) {
    yield put({
      type: UPDATE_PRODUCTS_FAIL,
      payload: error,
    });
  }
}

function* deleteProductSaga(action) {
  try {
    const { id } = action.payload;

    const { status, error, data } = yield axiosClient.delete(`admin/products/${id}`);
    if (status === 'failed' && error) {
      throw new Error(error.message);
    }

    if (status === 'success' && data) {
      toastSuccess(data.message);
    }
    yield put({
      type: DELETE_PRODUCTS_SUCCESS,
      payload: id,
    });
  } catch (error) {
    yield put({
      type: DELETE_PRODUCTS_FAIL,
      payload: error,
    });
  }
}

export default function* productSaga() {
  yield takeEvery(GET_PRODUCT_HOME, getProductHomeSaga);
  yield takeEvery(GET_PRODUCTS, getProductSaga);
  yield takeEvery(CREATE_PRODUCTS, createProductSaga);
  yield takeEvery(UPDATE_PRODUCTS, updateProductSaga);
  yield takeEvery(DELETE_PRODUCTS, deleteProductSaga);
}
