import {
  CREATE_ACCOUNT,
  GET_USER_ACCOUNT,
  EDIT_PROFILE,
  GET_INFO,
  GET_LIST_USER,
  EDIT_USER_BY_ADMIN,
  DELETE_USER,
  EDIT_USER_PASSWORD,
  GET_VOUCHER_USER,
} from '../constants';

export function createAccount(params) {
  return {
    type: CREATE_ACCOUNT,
    payload: params,
  };
}
export function getUser(params) {
  return {
    type: GET_USER_ACCOUNT,
    payload: params,
  };
}
export function getInfo(params) {
  return {
    type: GET_INFO,
    payload: params,
  };
}
export function editProfile(params) {
  return {
    type: EDIT_PROFILE,
    payload: params,
  };
}
export function getListUser(params) {
  return {
    type: GET_LIST_USER,
    payload: params,
  };
}
export function deleteUser(params) {
  return {
    type: DELETE_USER,
    payload: params,
  };
}

export function editUserByAdmin(params) {
  return {
    type: EDIT_USER_BY_ADMIN,
    payload: params,
  };
}

export function editUserPassword(params) {
  return {
    type: EDIT_USER_PASSWORD,
    payload: params,
  };
}

export function getVoucherUser(params) {
  return {
    type: GET_VOUCHER_USER,
    payload: params,
  };
}
