/* globals google */
import MarkerManager from '../../util/marker_manager';
import React from 'react';
import { connect } from 'react-redux';
import {
  setActiveHarvst,
  setHoveredHarvst
} from '../../actions/harvst_actions';

function initMap() {
  return new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.773972, lng: -122.431297},
    zoom: 12
  });
}

class HarvstMap extends React.Component {
  componentDidMount() {
    this.map = initMap();
    this.MarkerManager = new MarkerManager(
      this.map,
      this._handleMarkerClick.bind(this)
    );
    this.MarkerManager.updateMarkers(this.props.harvsts);
  }

  componentDidUpdate() {
    this.MarkerManager.updateMarkers(this.props.harvsts);
    this.MarkerManager.hover(this.props.hoveredHarvst);
  }

  _handleMarkerClick(harvst) {
    this.props.setActive(harvst.id);
  }

  render() {
    return(
      <div id="map"></div>
    );
  }
}

const mapStateToProps = state => ({
  hoveredHarvst: state.activeHarvst.hoveredHarvst
});

const mapDispatchToProps = dispatch => ({
  setActive: harvstId => dispatch(setActiveHarvst(harvstId)),
  setHoveredHarvst: harvstId => dispatch(setHoveredHarvst(harvstId))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HarvstMap);
