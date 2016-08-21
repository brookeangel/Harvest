export const REQUEST_HARVSTS = 'REQUEST_HARVSTS';
export const RECEIVE_HARVSTS = 'RECEIVE_HARVSTS';

export const requestHarvsts = params => ({
  type: REQUEST_HARVSTS,
  params
});

export const receiveHarvsts = harvsts => ({
  type: RECEIVE_HARVSTS,
  harvsts
});
