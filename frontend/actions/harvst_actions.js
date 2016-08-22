export const REQUEST_HARVSTS = 'REQUEST_HARVSTS';
export const RECEIVE_HARVSTS = 'RECEIVE_HARVSTS';
export const SET_ACTIVE_HARVST = 'SET_ACTIVE_HARVST';
export const CREATE_HARVST = 'CREATE_HARVST';
export const RECEIVE_HARVST = 'RECEIVE_HARVST';
export const RECEIVE_HARVST_ERRORS = 'RECEIVE_HARVST_ERRORS';

export const requestHarvsts = params => ({
  type: REQUEST_HARVSTS,
  params
});

export const receiveHarvsts = harvsts => ({
  type: RECEIVE_HARVSTS,
  harvsts
});

export const createHarvst = harvst => ({
  type: CREATE_HARVST,
  harvst
});

export const receiveHarvst = harvst => ({
  type: RECEIVE_HARVST,
  harvst
});

export const setActiveHarvst = harvst => ({
  type: SET_ACTIVE_HARVST,
  harvst
});

export const receiveHarvstErrors = errors => ({
  type: RECEIVE_HARVST_ERRORS,
  errors
});
