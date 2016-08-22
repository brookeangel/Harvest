import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import harvstReducer from './harvst_reducer';
import activeHarvstReducer from './active_harvst_reducer';
import harvstSuccessReducer from './harvst_success_reducer';

export default combineReducers({
  session: sessionReducer,
  harvsts: harvstReducer,
  activeHarvst: activeHarvstReducer,
  creationSuccess: harvstSuccessReducer
});
