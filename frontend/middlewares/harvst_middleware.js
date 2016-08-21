import { fetchHarvsts } from '../util/harvst_api_util';
import {
  REQUEST_HARVSTS,
  RECEIVE_HARVSTS,
  requestHarvsts,
  receiveHarvsts,
} from '../actions/harvst_actions';

const HarvstMiddleware = ({getState, dispatch}) => next => action => {
  let success = harvsts => dispatch(receiveHarvsts(harvsts));
  let error = e => console.log(e.responseJSON);

  switch (action.type) {
    case REQUEST_HARVSTS:
      fetchHarvsts(action.params, success, error);
      return next(action);
    default:
      return next(action);
  }
};

export default HarvstMiddleware;
