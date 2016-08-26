import { SET_CENTER } from '../actions/map_actions';

const defaultState = {lat: 37.773972, lng: -122.431297};

const mapReducer = (oldState = defaultState, action) => {
  switch (action.type) {
    case SET_CENTER:
      return Object.assign({}, action.latLng);
    default:
      return oldState;
  }
};

export default mapReducer;
