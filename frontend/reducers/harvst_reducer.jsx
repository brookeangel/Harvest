import merge from 'lodash/merge';
import {
  RECEIVE_HARVSTS,
  RECEIVE_HARVST
} from '../actions/harvst_actions';

const defaultState = Object.freeze({
  inBoundsHarvsts: {},
  starredHarvsts: {}
});
const harvstReducer = (oldState = {}, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_HARVSTS:
      return merge({}, action.harvsts);
    case RECEIVE_HARVST:
      newState = merge({}, oldState);
      newState.inBoundsHarvsts[action.harvst.id] = action.harvst;
      if (action.harvst.star_id) {
        newState.starredHarvsts[action.harvst.id] = action.harvst;
      } else {
        delete newState.starredHarvsts[action.harvst.id];
      }

      return newState;
    default:
      return oldState;
  }
};

export default harvstReducer;
