import { CREATE_CONTACT, GET_CONTACT, DELETE_CONTACT } from '../constants';

export function createContact(params) {
  return {
    type: CREATE_CONTACT,
    payload: params,
  };
}

export function getContact(params) {
  return {
    type: GET_CONTACT,
    payload: params,
  };
}

export function deleteContact(params) {
  return {
    type: DELETE_CONTACT,
    payload: params,
  };
}
