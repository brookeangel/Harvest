import {
  SET_ACTIVE_HARVST,
  SET_HOVERED_HARVST,
  TOGGLE_DRAWER
} from '../actions/harvst_actions';

const defaultState = Object.freeze({
  hoveredHarvst: null,
  activeHarvst: null,
  drawerOpen: false
});

export default (oldState = defaultState, action) => {
  switch (action.type) {
    case SET_ACTIVE_HARVST:
      return Object.assign({}, oldState, {activeHarvst: action.harvstId});
    case SET_HOVERED_HARVST:
      return Object.assign({}, oldState, {hoveredHarvst: action.harvstId});
    case TOGGLE_DRAWER:
      return Object.assign({}, oldState, {drawerOpen: !oldState.drawerOpen});
    default:
      return oldState;
  }
};
