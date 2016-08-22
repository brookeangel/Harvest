import { SET_ACTIVE_HARVST } from '../actions/harvst_actions';

export default (oldState = null, action) => {
  switch (action.type) {
    case SET_ACTIVE_HARVST:
      return action.harvst;
    default:
      return oldState;
  }
};
