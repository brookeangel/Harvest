import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import harvstReducer from './harvst_reducer';

export default combineReducers({
  session: sessionReducer,
  harvsts: harvstReducer
});
