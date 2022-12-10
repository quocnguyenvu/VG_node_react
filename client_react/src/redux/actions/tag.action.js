import { CREATE_TAG, DELETE_TAG, GET_TAG, GET_TAG_DETAIL, UPDATE_TAG } from '../constants';

export function getTag(params) {
  return {
    type: GET_TAG,
    payload: params,
  };
}

export function tagCreate(params) {
  return {
    type: CREATE_TAG,
    payload: params,
  };
}

export function deleteTag(params) {
  return {
    type: DELETE_TAG,
    payload: params,
  };
}

export function getTagDetail(params) {
  return {
    type: GET_TAG_DETAIL,
    payload: params,
  };
}

export function updateTag(params) {
  return {
    type: UPDATE_TAG,
    payload: params,
  };
}
