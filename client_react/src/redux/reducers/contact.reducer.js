import {
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAIL,
  GET_CONTACT_SUCCESS,
  GET_CONTACT_FAIL,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAIL,
} from '../constants';

const initialStore = {
  createData: {},
  contactData: {},
  deleteData: {},
};

export default function contactReducer(state = initialStore, action) {
  switch (action.type) {
    case CREATE_CONTACT_SUCCESS: {
      return {
        ...state,
        createData: { ...action.payload },
      };
    }
    case CREATE_CONTACT_FAIL: {
      return state;
    }
    case GET_CONTACT_SUCCESS: {
      return {
        ...state,
        contactData: { ...action.payload },
      };
    }
    case GET_CONTACT_FAIL: {
      return state;
    }
    case DELETE_CONTACT_SUCCESS: {
      return {
        ...state,
        deleteData: { ...action.payload },
      };
    }
    case DELETE_CONTACT_FAIL: {
      return state;
    }
    default: {
      return state;
    }
  }
}
