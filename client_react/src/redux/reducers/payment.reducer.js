import {
  CREATE_BILL_FAIL,
  CREATE_BILL_SUCCESS,
  GET_BILL,
  GET_BILL_FAIL,
  GET_BILL_SUCCESS,
  UPDATE_BILL_FAIL,
  UPDATE_BILL_SUCCESS,
  GET_PAYMENTS_SUCCESS,
  GET_PAYMENTS_FAIL,
  DELETE_PAYMENTS_SUCCESS,
  DELETE_PAYMENTS_FAIL,
  UPDATE_PAYMENTS_SUCCESS,
  UPDATE_PAYMENTS_FAIL,
  GET_ORDER_DETAIL_SUCCESS,
  GET_ORDER_DETAIL_FAIL,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
  GET_ORDER_USER_SUCCESS,
  GET_ORDER_USER_FAIL,
  GET_ORDER_USER,
  GET_BILL_DETAIL_USER,
  GET_BILL_DETAIL_USER_SUCCESS,
  GET_BILL_DETAIL_USER_FAIL
} from '../constants';

const initialState = {
  billInitData: {},
  billUpdateData: {},
  billData: {
    data:[],
    total:'',
    load:false,
    bill:{}
  },
  paymentsData: {},
  deleteData: {},
  updateData: {},
  orderDetail: {},
  orderUser:{
    data:[],
    load:false,
    total:''
  },
  billDetailUser:{
    data:[],
    load:false,
  },
  orderCancel:{}
};

export default function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_BILL_SUCCESS:
      return {
        ...state,
        billInitData: { ...action.payload },
      };
    case CREATE_BILL_FAIL: {
      return state;
    }
    case UPDATE_BILL_SUCCESS:
      return {
        ...state,
        billUpdateData: { ...action.payload },
      };
    case UPDATE_BILL_FAIL: {
      return state;
    }

    case GET_BILL:{
      return{
          ...state,
          billData:{
            load:true
          }
      }
    }
    
    case GET_BILL_SUCCESS:{ 
      const {data} = action.payload;
      return {
        ...state,
        billData: {
          ...state.billData,
          data,
          load: false
        },
      };
    }

    case GET_BILL_FAIL: {
      return{
        ...state,
        billData:{
          ...state.billData,
          load:false
        }
    }
    }
    case GET_PAYMENTS_SUCCESS:
      return {
        ...state,
        paymentsData: { ...action.payload },
      };
    case GET_PAYMENTS_FAIL: {
      return state;
    }
    case DELETE_PAYMENTS_SUCCESS:
      return {
        ...state,
        deleteData: { ...action.payload },
      };
    case DELETE_PAYMENTS_FAIL: {
      return state;
    }
    case UPDATE_PAYMENTS_SUCCESS:
      return {
        ...state,
        updateData: { ...action.payload },
      };
    case UPDATE_PAYMENTS_FAIL: {
      return state;
    }
    case GET_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        orderDetail: { ...action.payload },
      };
    case GET_ORDER_DETAIL_FAIL: {
      return state;
    }

    case CANCEL_ORDER_SUCCESS:{
      return {
        ...state,
        orderCancel: { ...action.payload },
      }
    }

    case CANCEL_ORDER_FAIL: {
      return state;
    }

    case GET_ORDER_USER:{
      return {
        ...state,
        orderUser:{
          ...state.orderUser,
          load:true
        }
      }
    }

    case GET_ORDER_USER_SUCCESS :{
      const {bills,total} = action.payload.data;

      return {
        ...state,
        orderUser: {
          ...state.orderUser,
          data:bills,
          load:false,
          total:total
        }
      }
    }

    case GET_ORDER_USER_FAIL :{
      return {
        ...state,
        orderUser: {
          ...state.orderUser,
          load:false
        }
      }
    }

    case GET_BILL_DETAIL_USER :{
      return {
        ...state,
        billDetailUser: {
          load:true
        }
      }
    }

    case GET_BILL_DETAIL_USER_SUCCESS :{
      const {billDetails,bill} = action.payload.data;
      return {
        ...state,
        billDetailUser: {
          ...state.billDetailUser,
          data:billDetails,
          load:false,
          bill
        }
      }
    }

    case GET_BILL_DETAIL_USER_FAIL :{
      return {
        ...state,
        billDetailUser: {
          load:false
        }
      }
    }

    default:
      return state;
  }
}
