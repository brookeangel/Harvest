import { applyMiddleware } from 'redux';

import SessionMiddleware from '../middlewares/session_middleware';

const RootMiddleware = applyMiddleware(
  SessionMiddleware
);

export default RootMiddleware;
