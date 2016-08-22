import {
  RECEIVE_HARVST_ERRORS,
  RECEIVE_HARVST
} from '../actions/harvst_actions';

const defaultState = {
  success: false,
  errors: []
};

const HarvstSuccessReducer = (oldState = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_HARVST_ERRORS:
      return { success: false, errors: action.errors };
    case RECEIVE_HARVST:
      return { success: true, errors: [] };
    default:
      return oldState;
  }
};

export default HarvstSuccessReducer;
