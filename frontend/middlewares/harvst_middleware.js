import {
  fetchHarvsts,
  createHarvst
} from '../util/harvst_api_util';

import { uploadImage } from '../util/cloudinary_api_util';

import {
  REQUEST_HARVSTS,
  CREATE_HARVST,
  UPLOAD_IMAGE,
  receiveHarvst,
  receiveHarvsts,
  receiveHarvstErrors,
  receiveImage
} from '../actions/harvst_actions';

const HarvstMiddleware = ({getState, dispatch}) => next => action => {
  let success;
  let error = e => dispatch(receiveHarvstErrors(e.responseJSON));

  switch (action.type) {
    case REQUEST_HARVSTS:
      success = harvsts => dispatch(receiveHarvsts(harvsts));
      fetchHarvsts(action.params, success,
        () => console.log("Could not fetch."));
      return next(action);
    case CREATE_HARVST:
      success = harvst => dispatch(receiveHarvst(harvst));
      createHarvst(action.harvst, success, error);
      return next(action);
    case UPLOAD_IMAGE:
      success = image => dispatch(receiveImage(image));
      uploadImage(action.image, success);
      return next(action);
    default:
      return next(action);
  }
};

export default HarvstMiddleware;
