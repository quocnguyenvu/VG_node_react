import {
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAIL,
  GET_USER_ACCOUNT_SUCCESS,
  GET_USER_ACCOUNT_FAIL,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_SUCCESS,
  GET_INFO_FAIL,
  GET_INFO_SUCCESS,
  GET_LIST_USER_FAIL,
  GET_LIST_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  GET_INFO,
  EDIT_USER_BY_ADMIN_SUCCESS,
  EDIT_USER_PASSWORD_SUCCESS,
  EDIT_USER_PASSWORD_FAIL,
  EDIT_USER_BY_ADMIN_FAIL,
  GET_VOUCHER_USER_SUCCESS,
  GET_VOUCHER_USER_FAIL,
  GET_VOUCHER_USER,
} from '../constants';

const initialStore = {
  userList: [],
  user: {},
  userDataEdited: {},
  infoUser: {
    data: [],
    load: false,
  },
  adminCreate: {},
  deleteUser: [],
  userEdit: {},
  listUser: {},

  listVoucherUser: {
    load: false,
    data: [],
    total: '',
  },
};

export default function accountReducer(state = initialStore, action) {
  switch (action.type) {
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        userList: [action.payload],
      };
    case CREATE_ACCOUNT_FAIL: {
      return state;
    }
    case GET_USER_ACCOUNT_SUCCESS: {
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
    }
    case GET_USER_ACCOUNT_FAIL: {
      return state;
    }

    case GET_INFO: {
      return {
        ...state,
        infoUser: {
          load: true,
        },
      };
    }

    case GET_INFO_SUCCESS: {
      const { user } = action.payload.data;
      return {
        ...state,
        infoUser: {
          ...state.infoUser,
          data: user,
          load: false,
        },
      };
    }
    case GET_INFO_FAIL: {
      return {
        ...state,
        infoUser: {
          load: false,
        },
      };
    }
    case EDIT_PROFILE_SUCCESS: {
      return {
        ...state,
        userDataEdited: {
          ...action.payload,
        },
      };
    }

    case EDIT_PROFILE_FAIL: {
      return state;
    }
    case GET_LIST_USER_SUCCESS: {
      return {
        ...state,
        listUser: { ...action.payload },
      };
    }
    case GET_LIST_USER_FAIL: {
      return state;
    }
    case DELETE_USER_SUCCESS: {
      const data = state.listUser.users.filter((item) => item.id !== action.payload);
      return { ...state, listUser: { users: data, total: state.listUser.total - 1 } };
    }
    case DELETE_USER_FAIL: {
      return state;
    }
    case EDIT_USER_BY_ADMIN_SUCCESS: {
      const listUser = JSON.parse(JSON.stringify(state.listUser));
      const index = state.listUser.users.findIndex((item) => item.id === action.payload.id);
      listUser.users[index] = action.payload;
      return {
        ...state,
        listUser,
      };
    }
    case EDIT_USER_BY_ADMIN_FAIL: {
      return state;
    }
    case EDIT_USER_PASSWORD_SUCCESS: {
      return {
        ...state,
        userEdit: {
          ...action.payload,
        },
      };
    }
    case EDIT_USER_PASSWORD_FAIL: {
      return state;
    }

    case GET_VOUCHER_USER: {
      return {
        ...state,
        listVoucherUser: {
          load: true,
        },
      };
    }

    case GET_VOUCHER_USER_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        listVoucherUser: {
          ...state.listVoucherUser,
          data: data.discountCodes,
          load: false,
        },
      };
    }

    case GET_VOUCHER_USER_FAIL: {
      return {
        ...state,
        listVoucherUser: {
          ...state.listVoucherUser,
          load: false,
        },
      };
    }

    default: {
      return state;
    }
  }
}
