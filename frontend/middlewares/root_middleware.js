import { applyMiddleware } from 'redux';

import SessionMiddleware from '../middlewares/session_middleware';
import HarvstMiddleware from '../middlewares/harvst_middleware';

const RootMiddleware = applyMiddleware(
  SessionMiddleware,
  HarvstMiddleware
);

export default RootMiddleware;
