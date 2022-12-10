import {
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_SUCCESS,
  GET_SIDEBAR_FAIL,
  GET_SIDEBAR_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_SUCCESS,
} from '../constants';

const initialState = {
  categoryData: [],
  sidebarData: {},
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY_SUCCESS: {
      return {
        ...state,
        categoryData: [...action.payload.categories],
      };
    }
    case GET_CATEGORY_FAIL: {
      return state;
    }
    case GET_SIDEBAR_SUCCESS: {
      return {
        ...state,
        sidebarData: { ...action.payload },
      };
    }
    case GET_SIDEBAR_FAIL: {
      return state;
    }
    case CREATE_CATEGORY_SUCCESS: {
      return {
        ...state,
        addCategory: { ...action.payload },
      };
    }
    case CREATE_CATEGORY_FAIL: {
      return state;
    }
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        updateCategỏy: { ...action.payload },
      };
    case UPDATE_CATEGORY_FAIL: {
      return state;
    }
    case DELETE_CATEGORY_SUCCESS: {
      const data = state.categoryData.filter((item) => item.id !== action.payload);
      return { ...state, categoryData: [...data] };
    }
    case DELETE_CATEGORY_FAIL: {
      return state;
    }
    default:
      return state;
  }
}
