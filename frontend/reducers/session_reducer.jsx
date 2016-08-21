import merge from 'lodash/merge';
import {
  RECEIVE_CURRENT_USER,
  REMOVE_CURRENT_USER,
  RECEIVE_ERRORS,
  REMOVE_ERRORS
} from '../actions/session_actions';

const _nullUser = Object.freeze({
  currentUser: null,
  errors: []
});

const sessionReducer = (oldState = _nullUser, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, {currentUser: action.user, errors: []});
    case REMOVE_CURRENT_USER:
      return merge({}, _nullUser);
    case RECEIVE_ERRORS:
      newState =  merge({}, oldState);
      newState.errors = action.errors;
      return newState;
    case REMOVE_ERRORS:
      newState = merge({}, oldState);
      newState.errors = [];
      return newState;
    default:
      return oldState;
  }
};

export default sessionReducer;
