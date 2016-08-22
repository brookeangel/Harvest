import merge from 'lodash/merge';
import {
  RECEIVE_HARVSTS,
  RECEIVE_HARVST
} from '../actions/harvst_actions';

const harvstReducer = (oldState = [], action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_HARVSTS:
      return merge([], action.harvsts);
    case RECEIVE_HARVST:
      const updatedHarvst = oldState.find(harvst => {
        return harvst.id === action.harvst.id;
      });
      const harvstIdx = oldState.indexOf(updatedHarvst);
      return [
        ...oldState.slice(0, harvstIdx),
        action.harvst,
        ...oldState.slice(harvstIdx + 1)
      ];
    default:
      return oldState;
  }
};

export default harvstReducer;
