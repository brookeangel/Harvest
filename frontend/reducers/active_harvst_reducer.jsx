import {
  SET_ACTIVE_HARVST,
  SET_HOVERED_HARVST
} from '../actions/harvst_actions';

const defaultState = Object.freeze({
  hoveredHarvst: null,
  activeHarvst: null
});

export default (oldState = defaultState, action) => {
  switch (action.type) {
    case SET_ACTIVE_HARVST:
      return Object.assign({}, oldState, {activeHarvst: action.harvstId});
    case SET_HOVERED_HARVST:
      return Object.assign({}, oldState, {hoveredHarvst: action.harvstId});
    default:
      return oldState;
  }
};
