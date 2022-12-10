import {
  GET_PRODUCT_DETAIL,
  CREATE_COMMENT,
  GET_COMMENT,
  GET_COUNT_COMMENT,
  GET_TOTAL_COMMENT,
  DELETE_COMMENT,
  GET_COMMENT_ADMIN,
} from '../constants';

export function getProductDetail(params) {
  return {
    type: GET_PRODUCT_DETAIL,
    payload: params,
  };
}
export function createComment(params) {
  return {
    type: CREATE_COMMENT,
    payload: params,
  };
}
export function getComment(params) {
  return {
    type: GET_COMMENT,
    payload: params,
  };
}
export function getCountComment(params) {
  return {
    type: GET_COUNT_COMMENT,
    payload: params,
  };
}

export function getCommentAdmin(params) {
  return {
    type: GET_COMMENT_ADMIN,
    payload: params,
  };
}

export function deleteComment(params) {
  return {
    type: DELETE_COMMENT,
    payload: params,
  };
}
