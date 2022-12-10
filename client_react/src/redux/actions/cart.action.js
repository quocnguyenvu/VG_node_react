import {
  ADD_CART,
  GET_CART,
  UPDATE_CART,
  DELETE_CART,
  CLEAR_CART,
  CLEAR_COUNT_CART,
} from '../constants';

export function addCart(params) {
  return {
    type: ADD_CART,
    payload: params,
  };
}

export function updateCart(params) {
  return {
    type: UPDATE_CART,
    payload: params,
  };
}

export function deleteCart(params) {
  return {
    type: DELETE_CART,
    payload: params,
  };
}

export function clearCart(params) {
  return {
    type: CLEAR_CART,
    payload: params,
  };
}

export function clearCountCart(params) {
  return {
    type: CLEAR_COUNT_CART,
    payload: params,
  };
}

export function getCartData(params) {
  return {
    type: GET_CART,
    payload: params,
  };
}
