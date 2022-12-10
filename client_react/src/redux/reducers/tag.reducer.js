import {
  CREATE_TAG_FAIL,
  CREATE_TAG_SUCCESS,
  DELETE_TAG_FAIL,
  DELETE_TAG_SUCCESS,
  GET_TAG_FAIL,
  GET_TAG_SUCCESS,
  UPDATE_TAG_FAIL,
  UPDATE_TAG_SUCCESS,
} from '../constants';

const initialState = {
  tagData: [],
};

export default function tagReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TAG_SUCCESS: {
      return {
        ...state,
        tagData: [...action.payload.tags],
      };
    }
    case GET_TAG_FAIL: {
      return state;
    }
    case UPDATE_TAG_SUCCESS:
      return {
        ...state,
        updateTag: { ...action.payload },
      };
    case UPDATE_TAG_FAIL: {
      return state;
    }
    case CREATE_TAG_SUCCESS: {
      return {
        ...state,
        addTag: { ...action.payload },
      };
    }
    case CREATE_TAG_FAIL: {
      return state;
    }
    case DELETE_TAG_SUCCESS: {
      const data = state.tagData.filter((item) => item.id !== action.payload);
      return { ...state, tagData: [...data] };
    }
    case DELETE_TAG_FAIL: {
      return state;
    }
    default:
      return state;
  }
}
