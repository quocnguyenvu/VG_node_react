import { GET_MASTER_DATA, GET_MASTER_DATA_SUCCESS, GET_MASTER_DATA_FAIL } from '../constants';

const initialStore = {
  masterData: {},
  loading: false,
};

export default function dashboardReducer(state = initialStore, action) {
  switch (action.type) {
    case GET_MASTER_DATA: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_MASTER_DATA_SUCCESS: {
      return {
        ...state,
        masterData: { ...action.payload },
        loading: false,
      };
    }
    case GET_MASTER_DATA_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}
