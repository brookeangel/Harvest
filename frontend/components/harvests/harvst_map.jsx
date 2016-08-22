/* globals google */
import MarkerManager from '../../util/marker_manager';
import React from 'react';

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
    this.props.setActiveHarvst(harvst.id);
  }

  render() {
    return(
      <div id="map"></div>
    );
  }
}


export default HarvstMap;
