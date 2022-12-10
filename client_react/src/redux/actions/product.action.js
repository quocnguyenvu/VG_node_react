import {
  GET_PRODUCT_HOME,
  GET_PRODUCTS,
  CREATE_PRODUCTS,
  UPDATE_PRODUCTS,
  DELETE_PRODUCTS,
  SET_VALUE_SEARCH,
  SET_FLAG_SEARCH_CHANGE,
} from '../constants';

export function getProductHome(params) {
  return {
    type: GET_PRODUCT_HOME,
    payload: params,
  };
}

export function getProducts(params) {
  return {
    type: GET_PRODUCTS,
    payload: params,
  };
}

export function createProduct(params) {
  return {
    type: CREATE_PRODUCTS,
    payload: params,
  };
}

export function updateProduct(params) {
  return {
    type: UPDATE_PRODUCTS,
    payload: params,
  };
}

export function deleteProduct(params) {
  return {
    type: DELETE_PRODUCTS,
    payload: params,
  };
}

export function setValueSearch(params) {
  return {
    type: SET_VALUE_SEARCH,
    payload: params,
  };
}

export function setFlagSearchChange(params) {
  return {
    type: SET_FLAG_SEARCH_CHANGE,
    payload: params,
  };
}
