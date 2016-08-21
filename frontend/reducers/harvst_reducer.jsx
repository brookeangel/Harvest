import merge from 'lodash/merge';
import {
  RECEIVE_HARVSTS,
} from '../actions/harvst_actions';

const harvstReducer = (oldState = [], action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_HARVSTS:
      return merge([], action.harvsts);
    default:
      return oldState;
  }
};

export default harvstReducer;
