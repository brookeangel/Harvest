/* globals google */
import MarkerManager from '../../util/marker_manager';
import React from 'react';
import { connect } from 'react-redux';
import {
  setActiveHarvst,
  setHoveredHarvst
} from '../../actions/harvst_actions';
import { requestHarvsts } from '../../actions/harvst_actions';
import harvstsSelector from '../../reducers/harvsts_selector';

function initMap() {
  return new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.773972, lng: -122.431297},
    zoom: 12
  });
}

class HarvstMap extends React.Component {
  componentDidMount() {
    this.map = initMap();
    this.mapListener = this.map.addListener(
      'idle',
      this.onMapIdle.bind(this)
    );

    this.MarkerManager = new MarkerManager(
      this.map,
      this._handleMarkerClick.bind(this)
    );
    this.MarkerManager.updateMarkers(this.props.harvsts);
  }

  componentWillUnmount() {
    google.maps.event.removeListener(this.mapListener );
  }

  onMapIdle() {
    let bounds = this.map.getBounds();
    this.props.requestHarvsts({
      bounds: {
        southWest: {
          lat: bounds.getSouthWest().lat(),
          lng: bounds.getSouthWest().lng()
        },
        northEast: {
          lat: bounds.getNorthEast().lat(),
          lng: bounds.getNorthEast().lng()
        }
      }
    });
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
  hoveredHarvst: state.activeHarvst.hoveredHarvst,
  harvsts: harvstsSelector(state.harvsts.inBoundsHarvsts)
});

const mapDispatchToProps = dispatch => ({
  requestHarvsts: bounds => dispatch(requestHarvsts(bounds)),
  setActive: harvstId => dispatch(setActiveHarvst(harvstId)),
  setHoveredHarvst: harvstId => dispatch(setHoveredHarvst(harvstId))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HarvstMap);
