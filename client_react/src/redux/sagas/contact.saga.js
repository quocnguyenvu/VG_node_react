import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { all, put, takeEvery } from 'redux-saga/effects';
import { toastSuccess } from '../../util/toast';
import {
  CREATE_CONTACT,
  CREATE_CONTACT_FAIL,
  CREATE_CONTACT_SUCCESS,
  GET_CONTACT,
  GET_CONTACT_FAIL,
  GET_CONTACT_SUCCESS,
  DELETE_CONTACT,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAIL,
} from '../constants';

const apiURL = 'http://localhost:3002';

function* createContactSaga(action) {
  try {
    const response = yield axios.post(`${apiURL}/contacts`, { ...action.payload });
    const data = response.data;
    toastSuccess('Gửi liên hệ thành công!');
    yield put({
      type: CREATE_CONTACT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: CREATE_CONTACT_FAIL,
      payload: error,
    });
  }
}

function* getContactSaga(action) {
  try {
    const { page, limit } = action.payload;
    const [responseData, responseTotal] = yield all([
      axios({
        method: 'GET',
        url: `${apiURL}/contacts`,
        params: {
          ...(page && { _page: page }),
          ...(limit && { _limit: limit }),
        },
      }),
      axios.get(`${apiURL}/contacts`),
    ]);
    const data = {
      contacts: responseData.data,
      total: responseTotal.data.length,
    };
    yield put({
      type: GET_CONTACT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_CONTACT_FAIL,
      payload: error,
    });
  }
}

function* deleteContactSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield axios.delete(`${apiURL}/contacts/${id}`);
    const data = response;
    toastSuccess('Xóa liên hệ thành công!');
    yield put({
      type: DELETE_CONTACT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: DELETE_CONTACT_FAIL,
      payload: error,
    });
  }
}

export default function* contactSaga() {
  yield takeEvery(CREATE_CONTACT, createContactSaga);
  yield takeEvery(GET_CONTACT, getContactSaga);
  yield takeEvery(DELETE_CONTACT, deleteContactSaga);
}
