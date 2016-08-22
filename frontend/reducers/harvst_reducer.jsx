import merge from 'lodash/merge';
import {
  RECEIVE_HARVSTS,
  RECEIVE_HARVST
} from '../actions/harvst_actions';

const harvstReducer = (oldState = {}, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_HARVSTS:
      newState = {};
      action.harvsts.forEach(harvst => {
        newState[harvst.id] = harvst;
      });
      return newState;
    case RECEIVE_HARVST:
      newState = merge({}, oldState);
      return Object.assign(newState, {[action.harvst.id]: action.harvst});
    default:
      return oldState;
  }
};

export default harvstReducer;
