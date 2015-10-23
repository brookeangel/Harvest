(function(root) {

  root.ShowMap = React.createClass({

    getInitialState: function() {
      return {windowWidth: root.innerWidth, windowHeight: root.innerHeight};
    },

    handleResize: function(e) {
      this.setState({windowWidth: root.innerWidth, windowHeight: root.innerHeight});
    },

    componentDidMount: function() {
      root.addEventListener('resize', this.handleResize);

      var lat = parseFloat(this.props.lat);
      var lng = parseFloat(this.props.lng);

      var map = React.findDOMNode(this.refs.map);

      var mapOptions = {
        center: {lat: lat, lng: lng},
        zoom: 13
      };

      this.map = new google.maps.Map(map, mapOptions);
      var img = "http://res.cloudinary.com/harvst/image/upload/c_scale,h_35/v1445568875/favicon_ovtwiw.png";

      this.marker = new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map: this.map,
        title: "harvest",
        icon: img
      });
    },

    componentWillReceiveProps: function(newProps) {
      var pos = {
        lat: newProps.lat,
        lng: newProps.lng
      };
      var latLng = new google.maps.LatLng(pos.lat, pos.lng);

      this.map.setCenter(latLng);
      this.marker.setPosition(latLng);
    },

    componentWillUnmount: function() {
      root.removeEventListener('resize', this.handleResize);
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
