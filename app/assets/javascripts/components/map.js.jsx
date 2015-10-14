(function(root) {

  root.Map = React.createClass({

    componentDidMount: function() {
      var map = React.findDOMNode(this.refs.map);
      var mapOptions = {
        center: {lat: 37.7758, lng: -122.435},
        zoom: 13
      };
      this.markers = {};
      this.map = new google.maps.Map(map, mapOptions);
      debugger;
      // this.map.addListener('idle', this._handleIdleEvent);
      // BikeStore.addChangeListener(this._adjustMarkers);
      //
      // this.map.addListener('click', this.props.handleMapClick);
    },

    // _handleIdleEvent: function() {
    //   var bounds = this.map.getBounds();
    //   var northEast = bounds.getNorthEast();
    //   var southWest = bounds.getSouthWest();
    //   var northEastCoords = {lat: northEast["J"], lng: northEast["M"]};
    //   var southWestCoords = {lat: southWest["J"], lng: southWest["M"]};
    //   var boundsObj = {bounds: {northEast: northEastCoords, southWest: southWestCoords}};
    //   FilterActions.receiveAll(boundsObj);
    //
    // },
    //
    // _handleMarkerClick: function(id) {
    //   this.history.pushState(null, "show/"+id);
    // },
    //
    // _adjustMarkers: function() {
    //   var bikes = BikeStore.all();
    //   var that = this;
    //   bikes.map(function(bike) {
    //     if (typeof that.markers[bike.id] === 'undefined') {
    //       var marker = new google.maps.Marker({
    //         position: {lat: bike.lat, lng: bike.lng},
    //         map: that.map,
    //         title: 'Bike'
    //       });
    //       marker.addListener('click', that._handleMarkerClick.bind(that, bike.id));
    //       that.markers[bike.id] = marker;
    //     }
    //   });
    //
    //   var bikeids = bikes.map(function(bike) {return String(bike.id);});
    //
    //   Object.keys(this.markers).map(function(markerBikeId) {
    //     if (bikeids.indexOf(markerBikeId) === -1) {
    //       that.markers[markerBikeId].setMap(null);
    //       delete that.markers[markerBikeId];
    //     }
    //   });
    // },

    render: function() {
      return(
        <div className="map" ref="map"></div>
      )
    }
  });

}(this));
