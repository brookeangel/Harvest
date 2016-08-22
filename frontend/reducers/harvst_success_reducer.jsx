import {
  RECEIVE_HARVST_ERRORS,
  RECEIVE_HARVST,
  RECEIVE_IMAGE,
  RESET_FORM
} from '../actions/harvst_actions';

const defaultState = Object.freeze({
  success: false,
  errors: [],
  image_url: ''
});

const HarvstSuccessReducer = (oldState = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_HARVST_ERRORS:
      return Object.assign({}, oldState, { success: false, errors: action.errors });
    case RECEIVE_HARVST:
      return Object.assign({}, oldState, { success: true, errors: [] });
    case RECEIVE_IMAGE:
      return Object.assign({}, oldState, { image_url: action.image });
    case RESET_FORM:
      return defaultState;
    default:
      return oldState;
  }
};

export default HarvstSuccessReducer;
