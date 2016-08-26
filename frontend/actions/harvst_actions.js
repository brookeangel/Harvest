export const REQUEST_HARVSTS = 'REQUEST_HARVSTS';
export const RECEIVE_HARVSTS = 'RECEIVE_HARVSTS';
export const SET_ACTIVE_HARVST = 'SET_ACTIVE_HARVST';
export const SET_HOVERED_HARVST = 'SET_HOVERED_HARVST';
export const CREATE_HARVST = 'CREATE_HARVST';
export const RECEIVE_HARVST = 'RECEIVE_HARVST';
export const RECEIVE_HARVST_ERRORS = 'RECEIVE_HARVST_ERRORS';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const RECEIVE_IMAGE = 'RECEIVE_IMAGE';
export const RESET_FORM = 'RESET_FORM';
export const TOGGLE_STAR = 'TOGGLE_STAR';

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

export const setActiveHarvst = harvstId => ({
  type: SET_ACTIVE_HARVST,
  harvstId
});

export const setHoveredHarvst = harvstId => ({
  type: SET_HOVERED_HARVST,
  harvstId
});

export const receiveHarvstErrors = errors => ({
  type: RECEIVE_HARVST_ERRORS,
  errors
});

export const uploadImage = image => ({
  type: UPLOAD_IMAGE,
  image
});

export const receiveImage = image => ({
  type: RECEIVE_IMAGE,
  image
});

export const resetForm = () => ({
  type: RESET_FORM
});

export const toggleStar = harvst => ({
  type: TOGGLE_STAR,
  harvst
});
