import {
  ADD_CART_FAIL,
  ADD_CART_SUCCESS,
  UPDATE_CART_FAIL,
  UPDATE_CART_SUCCESS,
  DELETE_CART_FAIL,
  DELETE_CART_SUCCESS,
  CLEAR_CART_FAIL,
  CLEAR_CART_SUCCESS,
  GET_CART_FAIL,
  GET_CART_SUCCESS,
  CLEAR_COUNT_CART,
} from '../constants';

const initialState = {
  cartData: {},
  addCartData: {},
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CART_SUCCESS: {
      const cartData = { ...state.cartData };
      cartData.cartDetails = [...action.payload];
      return {
        ...state,
        cartData: { ...cartData },
      };
    }
    case ADD_CART_FAIL: {
      return state;
    }
    case UPDATE_CART_SUCCESS: {
      const cartData = JSON.parse(JSON.stringify(state.cartData));
      const index = cartData.cartDetails.findIndex((c) => c._id === action.payload.id);
      cartData.cartDetails[index].quantity = action.payload.quantity;
      return {
        ...state,
        cartData,
      };
    }
    case UPDATE_CART_FAIL: {
      return state;
    }
    case DELETE_CART_SUCCESS: {
      const cartData = JSON.parse(JSON.stringify(state.cartData));
      const index = cartData.cartDetails.findIndex((c) => c._id === action.payload.cartDetailId);
      cartData.cartDetails.splice(index, 1);
      return {
        ...state,
        cartData: { ...cartData },
      };
    }
    case DELETE_CART_FAIL: {
      return state;
    }
    case CLEAR_CART_SUCCESS: {
      const cartData = JSON.parse(JSON.stringify({ ...state.cartData, cartDetails: [] }));
      return {
        ...state,
        cartData: { ...cartData },
      };
    }
    case CLEAR_CART_FAIL: {
      return state;
    }
    case GET_CART_SUCCESS:
      return {
        ...state,
        cartData: { ...action.payload },
      };
    case GET_CART_FAIL: {
      return state;
    }
    case CLEAR_COUNT_CART: {
      return { ...state, cartData: {} };
    }
    default:
      return state;
  }
}
