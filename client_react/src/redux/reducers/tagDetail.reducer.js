import { GET_TAG_DETAIL_SUCCESS } from '../constants';

const initialState = {
  tagDetail: [],
};

export default function tagDetailReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TAG_DETAIL_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,

        tagDetail: {
          ...state.tagDetail,
          data: data,
          load: false,
        },
      };
    }

    default:
      return state;
  }
}
