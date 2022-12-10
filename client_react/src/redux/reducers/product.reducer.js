import {
  GET_PRODUCT_HOME_FAIL,
  GET_PRODUCT_HOME_SUCCESS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  CREATE_PRODUCTS_SUCCESS,
  CREATE_PRODUCTS_FAIL,
  UPDATE_PRODUCTS_SUCCESS,
  UPDATE_PRODUCTS_FAIL,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_FAIL,
  SET_VALUE_SEARCH,
  SET_FLAG_SEARCH_CHANGE,
} from '../constants';

const initialState = {
  productHome: {},
  productsData: [],
  totalProduct: 0,
  addProduct: {},
  updateProduct: {},
  deleteProduct: {},
  valueSearch: '',
  flagSearchChange: false,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_HOME_SUCCESS:
      return {
        ...state,
        productHome: { ...action.payload },
      };
    case GET_PRODUCT_HOME_FAIL: {
      return state;
    }
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsData: [...action.payload.products],
        totalProduct: action.payload.totalProduct,
      };
    case GET_PRODUCTS_FAIL: {
      return state;
    }
    case CREATE_PRODUCTS_SUCCESS:
      return {
        ...state,
        addProduct: { ...action.payload },
      };
    case CREATE_PRODUCTS_FAIL: {
      return state;
    }
    case UPDATE_PRODUCTS_SUCCESS:
      return {
        ...state,
        updateProduct: { ...action.payload },
      };
    case UPDATE_PRODUCTS_FAIL: {
      return state;
    }
    case DELETE_PRODUCTS_SUCCESS:
      const data = state.productsData.filter((item) => item.id !== action.payload);
      return { ...state, productsData: [...data] };
    case DELETE_PRODUCTS_FAIL: {
      return state;
    }
    case SET_VALUE_SEARCH: {
      return {
        ...state,
        valueSearch: action.payload,
      };
    }
    case SET_FLAG_SEARCH_CHANGE: {
      return {
        ...state,
        flagSearchChange: action.payload,
      };
    }
    default:
      return state;
  }
}
