import {
  GET_DISCOUNT_SUCCESS,
  GET_DISCOUNT_FAIL,
  CREATE_DISCOUNT_FAIL,
  CREATE_DISCOUNT_SUCCESS,
  GET_DISCOUNT_USER_FAIL,
  GET_DISCOUNT_USER_SUCCESS,
  GET_ALL_DISCOUNT_USER_FAIL,
  GET_ALL_DISCOUNT_USER_SUCCESS,
  DELETE_DISCOUNT_FAIL,
  DELETE_DISCOUNT_SUCCESS,
  ADD_DISCOUNT_USER_FAIL,
  ADD_DISCOUNT_USER_SUCCESS,
} from '../constants';

const initialState = {
  discountData: [],
  totalDiscount: 0,
  discountAllData: [],
  totalDiscountAll: 0,
  discountUserData: [],
  totalDiscountUser: 0,
  addDiscount: {},
};

const checkDate = (startD, endD) => {
  const now = new Date();
  const start = new Date(startD);
  const end = new Date(endD);
  start.setHours(0);
  start.setMinutes(0);
  end.setHours(23);
  end.setMinutes(59);
  return now.getTime() > end.getTime() || start.getTime() > now.getTime() ? false : true;
};

export default function discountReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DISCOUNT_SUCCESS: {
      return {
        ...state,
        discountData: [...action.payload.discountCodes],
        totalDiscount: action.payload.total,
      };
    }

    case GET_DISCOUNT_FAIL: {
      return state;
    }
    case GET_DISCOUNT_USER_SUCCESS: {
      const discount = action.payload.discountCodes.filter((discount) =>
        checkDate(discount.dateCreate, discount.dateExpire)
      );
      return {
        ...state,
        discountUserData: [...discount],
        totalDiscountUser: discount.length,
      };
    }
    case GET_DISCOUNT_USER_FAIL: {
      return state;
    }
    case GET_ALL_DISCOUNT_USER_SUCCESS: {
      const discount = action.payload.discountCodes.filter((discount) =>
        checkDate(discount.dateCreate, discount.dateExpire)
      );
      return {
        ...state,
        discountAllData: [...discount],
        totalDiscountAll: discount.length,
      };
    }
    case GET_ALL_DISCOUNT_USER_FAIL: {
      return state;
    }
    case CREATE_DISCOUNT_SUCCESS: {
      return {
        ...state,
        addDiscount: { ...action.payload },
      };
    }
    case CREATE_DISCOUNT_FAIL: {
      return state;
    }
    case DELETE_DISCOUNT_SUCCESS: {
      const data = state.discountData.filter((item) => item.id !== action.payload);
      return { ...state, discountData: [...data] };
    }
    case DELETE_DISCOUNT_FAIL: {
      return state;
    }
    case ADD_DISCOUNT_USER_SUCCESS: {
      const discountUser = JSON.parse(JSON.stringify(state.discountUserData));
      const discountAllUser = JSON.parse(JSON.stringify(state.discountAllData));
      const { discountCodeId } = action.payload.discountCodeDetail;
      const index = discountAllUser.findIndex((discount) => discount.id === discountCodeId._id);

      discountUser.push({ ...discountCodeId, id: discountCodeId._id });
      discountAllUser[index] = {
        ...discountAllUser[index],
        total: discountAllUser[index]?.total - 1,
      };

      return { ...state, discountUserData: discountUser, discountAllData: discountAllUser };
    }
    case ADD_DISCOUNT_USER_FAIL: {
      return state;
    }
    default:
      return state;
  }
}
