import {
  CREATE_COMMENT,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_SUCCESS,
  GET_COMMENT,
  GET_COMMENT_ADMIN_FAIL,
  GET_COMMENT_ADMIN_SUCCESS,
  GET_COMMENT_FAIL,
  GET_COMMENT_SUCCESS,
  GET_PRODUCT_DETAIL,
  GET_PRODUCT_DETAIL_FAIL,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_TOTAL_COMMENT_FAIL,
  GET_TOTAL_COMMENT_SUCCESS,
} from '../constants';

const initialState = {
  productDetail: {
    product: {},
    load: false,
  },
  listComment: {
    data: [],
    load: false,
  },
  comments: {
    load: false,
    data: [],
    total: '',
  },
  countComment: '',
  totalComment: '',
  deleteData: {},
  listCommentAdmin: {},
};

export default function productDetailReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_DETAIL: {
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          load: true,
        },
      };
    }

    case GET_PRODUCT_DETAIL_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          data: data,
          load: false,
        },
      };
    }

    case GET_PRODUCT_DETAIL_FAIL: {
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          load: false,
        },
      };
    }

    case CREATE_COMMENT: {
      return {
        ...state,
        listComment: {
          ...state.listComment,
          load: true,
        },
      };
    }

    case CREATE_COMMENT_SUCCESS:
      const { data } = action.payload;

      return {
        ...state,
        listComment: {
          ...state.listComment,
          data: data,
          load: false,
        },
      };

    case CREATE_COMMENT_FAIL: {
      return {
        ...state,
        listComment: {
          ...state.listComment,
          load: false,
        },
      };
    }

    case GET_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comment,
          load: true,
        },
      };

    case GET_COMMENT_SUCCESS: {
      const { data, total } = action.payload;
      return {
        ...state,
        comments: {
          ...state.comments,
          data: data,
          load: false,
          total: total,
        },
      };
    }

    case GET_COMMENT_FAIL: {
      return {
        ...state,
        comments: {
          ...state.comment,
          load: false,
        },
      };
    }
    case GET_TOTAL_COMMENT_SUCCESS:
      return {
        ...state,
        totalComment: action.payload,
      };
    case GET_TOTAL_COMMENT_FAIL:
      return state;
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        deleteData: { ...action.payload },
      };
    case DELETE_COMMENT_FAIL:
      return state;
    case GET_COMMENT_ADMIN_SUCCESS:
      return {
        ...state,
        listCommentAdmin: { ...action.payload },
      };
    case GET_COMMENT_ADMIN_FAIL:
      return state;
    default:
      return state;
  }
}
