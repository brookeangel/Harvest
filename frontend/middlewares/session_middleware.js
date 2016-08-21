import { LOGIN, SIGNUP, LOGOUT } from '../actions/session_actions';
import { login, signup, logout } from '../util/session_api_util';
import {
  receiveCurrentUser,
  removeCurrentUser,
  receiveErrors
} from '../actions/session_actions';

const SessionMiddleware = ({getState, dispatch}) => next => action => {
  let success = user => dispatch(receiveCurrentUser(user));
  let error = errors => dispatch(receiveErrors(errors.responseJSON));

  switch (action.type) {
    case LOGIN:
      login(action.user, success, error);
      return next(action);
    case SIGNUP:
      signup(action.user, success, error);
      return next(action);
    case LOGOUT:
      logout(() => dispatch(removeCurrentUser()));
      return next(action);
    default:
      return next(action);
  }
};

export default SessionMiddleware;
