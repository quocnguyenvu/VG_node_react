import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORY,
  GET_CATEGORY_DETAIL,
  GET_SIDEBAR,
  UPDATE_CATEGORY,
} from '../constants';

export function getCategory(params) {
  return {
    type: GET_CATEGORY,
    payload: params,
  };
}

export function getSidebar(params) {
  return {
    type: GET_SIDEBAR,
    payload: params,
  };
}

export function categoryCreate(params) {
  return {
    type: CREATE_CATEGORY,
    payload: params,
  };
}

export function deleteCategory(params) {
  return {
    type: DELETE_CATEGORY,
    payload: params,
  };
}

export function getCategoryDetail(params) {
  return {
    type: GET_CATEGORY_DETAIL,
    payload: params,
  };
}

export function updateCategory(params) {
  return {
    type: UPDATE_CATEGORY,
    payload: params,
  };
}
