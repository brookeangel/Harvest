(function(root) {

  root.Map = React.createClass({

    getInitialState: function() {
      return {windowWidth: root.innerWidth, windowHeight: root.innerHeight};
    },

    handleResize: function(e) {
      this.setState({windowWidth: root.innerWidth, windowHeight: root.innerHeight});
    },


    componentDidMount: function() {
      var mapNode = React.findDOMNode(this.refs.map);
      var center;
      var geolocation = this._handleGeolocation();
      if (typeof root.position !== 'undefined') {
        center = {lat: root.position.lat, lng: root.position.lng};
      } else {
        center = {lat: 37.7758, lng: -122.435};
      }

      var mapOptions = {
        center: center,
        zoom: 13
      };

      this.map = new google.maps.Map(mapNode, mapOptions);

      HarvstActions.receiveOne(null);
      this.markers = {};
      this.infoWindow = new google.maps.InfoWindow({map: this.map, position: center});
      this.infoWindow.close(); // docs say it's hidden by default, but it hasn't been.
      if (geolocation) {
        this.handleLocationError(true);
      }

      // map listeners may need to be on some sort of callback once the map loads,
      // because they're breaking for me.
      this.map.addListener('idle', this._handleIdleEvent);
      this.map.addListener('click', this.props.handleMapClick);
      HarvstStore.addChangeListener(this._adjustMarkers);
      HarvstStore.addChangeListener(this._bounceMarker);
      root.addEventListener('resize', this.handleResize);
      LocationStore.addChangeListener(this._centerMap);
    },


    componentWillUnmount: function() {
      HarvstStore.removeChangeListener(this._adjustMarkers);
      HarvstStore.removeChangeListener(this._bounceMarker);
      root.removeEventListener('resize', this.handleResize);
      LocationStore.removeChangeListener(this._centerMap);
    },

    _centerMap: function() {
      var coords = LocationStore.getCoords();
      this.map.setCenter(coords);
    },


    _bounceMarker: function() {
      var activeHarvst = HarvstStore.getActiveHarvst();

      if (activeHarvst) {
        var marker = this.markers[activeHarvst.id];
        marker.setAnimation(google.maps.Animation.BOUNCE);
      } else {
        Object.keys(this.markers).map(function(markerHarvstId) {
          this.markers[markerHarvstId].setAnimation(null);
        }.bind(this));
      }
    },

    _handleGeolocation: function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // is there a reason the position is being saved globally?
            // if you need it somewhere else, doesn't it make more sense to put it
            // in LocationStore?
            root.position = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            // if the map is loaded, we want to recenter it here.
            // so, root.map is a thing... that points to the DOM node.
            // why?  It's not defined that way anywhere.
            if (this.map) {
              this.map.setCenter(root.position);
            }
          }.bind(this),
          this.handleLocationError.bind(null, false)
        )
      } else {
        return true;
      }
    },

    handleLocationError: function(browserHasGeolocation) {
      this.infoWindow.setPosition(this.map.getCenter());
      this.infoWindow.open(this.map)
      this.infoWindow.setContent(browserHasGeolocation ?
                    'Error: Your browser doesn\'t support geolocation.':
                    'Error: The Geolocation service failed.' );
    },


    _handleIdleEvent: function() {
      // this seems to work fine with a debugger, and break without...
      // is it possible this needs to wait until the map loads to initialize?
      var bounds = this.map.getBounds();
      var northEast = bounds.getNorthEast();
      var southWest = bounds.getSouthWest();
      var northEastCoords = {lat: northEast.lat(), lng: northEast.lng()};
      var southWestCoords = {lat: southWest.lat(), lng: southWest.lng()};
      var boundsObj = {bounds: {northEast: northEastCoords, southWest: southWestCoords}};
      FilterActions.receiveAll(boundsObj);
    },

    _handleMarkerClick: function(id) {
      this.props.history.pushState(null, id + "/show");
    },

    _adjustMarkers: function() {
      var harvsts = HarvstStore.all();
      var that = this;

      harvsts.map(function(harvst) {
        if (typeof that.markers[harvst.id] === 'undefined') {
          var marker = new google.maps.Marker({
            position: {lat: harvst.lat, lng: harvst.lng},
            map: that.map,
            title: harvst.title,
          });
          marker.addListener('click', that._handleMarkerClick.bind(that, harvst.id));
          // can bind null as well, but largely irrelevant.
          that.markers[harvst.id] = marker;
        }
      });

      var harvstids = harvsts.map(function(harvst) {return String(harvst.id);});

      Object.keys(this.markers).map(function(markerHarvstId) {
        if (harvstids.indexOf(markerHarvstId) === -1) {
          that.markers[markerHarvstId].setMap(null);
          delete that.markers[markerHarvstId]; // what.
        }
      });
    },

    render: function() {
      var mapStyle;
      if (this.state.windowWidth > 992) {
        mapStyle = {
          width: this.state.windowWidth * 0.59,
          height: this.state.windowHeight
        };
        divStyle = {position: 'fixed'};
      } else {
        mapStyle = {
          width: this.state.windowWidth,
          height: this.state.windowHeight
        };
        divStyle = {position: 'relative'};
      }


      return(
        <div className="col-md-7" style={divStyle}>
          <div id="map" ref="map" style={mapStyle}></div>
        </div>
      );
    }
  });

}(this));
