import { put, takeEvery } from 'redux-saga/effects';
import history from '../../util/history';
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from '../config/axiosClient';
import { toastSuccess, toastError } from '../../util/toast';

import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAIL,
  GET_USER_ACCOUNT,
  GET_USER_ACCOUNT_SUCCESS,
  GET_USER_ACCOUNT_FAIL,
  EDIT_PROFILE,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_SUCCESS,
  GET_INFO,
  GET_INFO_FAIL,
  GET_INFO_SUCCESS,
  GET_LIST_USER,
  GET_LIST_USER_FAIL,
  GET_LIST_USER_SUCCESS,
  EDIT_USER_BY_ADMIN,
  EDIT_USER_BY_ADMIN_FAIL,
  EDIT_USER_BY_ADMIN_SUCCESS,
  DELETE_USER,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  EDIT_USER_PASSWORD,
  EDIT_USER_PASSWORD_FAIL,
  EDIT_USER_PASSWORD_SUCCESS,
  GET_VOUCHER_USER,
  GET_VOUCHER_USER_SUCCESS,
  GET_VOUCHER_USER_FAIL,
} from '../constants';

function* editUserByAdminSaga(action) {
  try {
    const { id, role, status } = action.payload;
    const {
      status: s,
      error,
      data,
    } = yield axiosClient.patch(`admin/user/${id}`, {
      role,
      status,
    });

    if (s === 'failed' && error) {
      throw new Error(error.message);
    }
    yield put({
      type: EDIT_USER_BY_ADMIN_SUCCESS,
      payload: data.user,
    });
    toastSuccess(data.message);
  } catch (error) {
    toastError(error.message);
    yield put({
      type: EDIT_USER_BY_ADMIN_FAIL,
      payload: error,
    });
  }
}

function* deleteUserSaga(action) {
  try {
    const { id } = action.payload;
    const { status, error, data } = yield axiosClient.delete(`admin/user/${id}`);

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }
    yield put({
      type: DELETE_USER_SUCCESS,
      payload: id,
    });
    toastSuccess(data.message);
  } catch (error) {
    toastError(error);
    yield put({
      type: DELETE_USER_FAIL,
      payload: error,
    });
  }
}

function* getListUserSaga(action) {
  try {
    const { page, limit, search } = action.payload;
    const { status, error, data } = yield axiosClient({
      url: `admin/user`,
      method: 'GET',
      params: {
        ...(page && { _page: page }),
        ...(limit && { _limit: limit }),
        ...(search && { q: search }),
      },
    });

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }

    yield put({
      type: GET_LIST_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_LIST_USER_FAIL,
      payload: error,
    });
    toastError(error);
  }
}

function* createAccountSaga(action) {
  try {
    const { status, error, data } = yield axiosClient.post(`/user/auth/register`, {
      ...action.payload,
    });

    if (status === 'failed' && error) {
      throw new Error(error.message);
    }

    if (status === 'success' && data) {
      toastSuccess(data.message);
    }
    history.push('/login');
    yield put({
      type: CREATE_ACCOUNT_SUCCESS,
      payload: [],
    });
  } catch (error) {
    toastError(error.message);
    yield put({
      type: CREATE_ACCOUNT_FAIL,
      payload: error,
    });
  }
}

function* getInfoSaga(action) {
  try {
    const response = yield axiosClient.get('user/auth');

    if (response.status === 'failed' && response.error) throw new Error(response.error.message);

    yield put({
      type: GET_INFO_SUCCESS,
      payload: {
        data: response.data,
      },
    });
  } catch (error) {
    toastError(error.message);
    yield put({
      type: GET_INFO_FAIL,
      payload: error,
    });

    toastError(error.message);
  }
}

function* loginSaga(action) {
  try {
    const { phoneNumber, password } = action.payload;
    const { status, error, data } = yield axiosClient.post(`/user/auth/login`, {
      phoneNumber,
      password,
    });

    if (status === 'failed' && error.message) {
      throw new Error(error.message);
    }

    if (data.token && status === 'success') {
      localStorage.setItem('token', data.token);
      localStorage.setItem('profile', JSON.stringify(data.user));
      toastSuccess('Đăng Nhập Thành Công!');
      data.user.role === 'admin' ? history.push('/admin') : history.push('/');
    }

    yield put({
      type: GET_USER_ACCOUNT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: GET_USER_ACCOUNT_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* editProfileSaga(action) {
  try {
    const { status, error, data } = yield axiosClient.patch(`user/auth`, action.payload);

    if (status === 'failed' && error.message) {
      throw new Error(error.message);
    }

    yield put({
      type: EDIT_PROFILE_SUCCESS,
      payload: data,
    });
    localStorage.setItem('profile', JSON.stringify(data.user));

    toastSuccess('Đổi thông tin thành công!');
  } catch (error) {
    yield put({
      type: EDIT_PROFILE_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* editPasswordUser(action) {
  try {
    const { status, error, data } = yield axiosClient.patch(
      'user/auth/updatePassword',
      action.payload
    );

    if (status === 'failed' && error.message) {
      throw new Error(error.message);
    }

    yield put({
      type: EDIT_USER_PASSWORD_SUCCESS,
      payload: data,
    });

    toastSuccess(data.message);
  } catch (error) {
    yield put({
      type: EDIT_USER_PASSWORD_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

function* getVoucherUserSaga(action) {
  try {
    const { page, limit, search } = action.payload;

    const { status, error, data } = yield axiosClient({
      url: `/user/discountCodeDetail`,
      method: 'GET',
      params: {
        ...(page && { _page: page }),
        ...(limit && { _limit: limit }),
        ...(search && { q: search }),
      },
    });

    if (status === 'failed' && error.message) {
      throw new Error(error.message);
    }

    yield put({
      type: GET_VOUCHER_USER_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (error) {
    yield put({
      type: GET_VOUCHER_USER_FAIL,
      payload: error,
    });
    toastError(error.message);
  }
}

export default function* accountSaga() {
  yield takeEvery(CREATE_ACCOUNT, createAccountSaga);
  yield takeEvery(GET_USER_ACCOUNT, loginSaga);
  yield takeEvery(EDIT_PROFILE, editProfileSaga);
  yield takeEvery(GET_INFO, getInfoSaga);
  yield takeEvery(GET_LIST_USER, getListUserSaga);
  yield takeEvery(EDIT_USER_BY_ADMIN, editUserByAdminSaga);
  yield takeEvery(DELETE_USER, deleteUserSaga);
  yield takeEvery(EDIT_USER_PASSWORD, editPasswordUser);
  yield takeEvery(GET_VOUCHER_USER, getVoucherUserSaga);
}
