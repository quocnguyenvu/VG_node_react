import { GET_CATEGORY_DETAIL_SUCCESS } from '../constants';

const initialState = {
  categoryDetail: [],
};

export default function tagDetailReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY_DETAIL_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,

        categoryDetail: {
          ...state.categoryDetail,
          data: data,
          load: false,
        },
      };
    }

    default:
      return state;
  }
}
