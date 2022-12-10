import { GET_MASTER_DATA } from '../constants';

export function getMasterData(params) {
  return {
    type: GET_MASTER_DATA,
    payload: params,
  };
}
