(function(root) {

  root.ShowMap = React.createClass({

    componentDidMount: function() {
      var lat = parseFloat(this.props.lat);
      var lng = parseFloat(this.props.lng);

      var map = React.findDOMNode(this.refs.map);

      var mapOptions = {
        center: {lat: lat, lng: lng},
        zoom: 13
      };

      this.map = new google.maps.Map(map, mapOptions);
      this.marker = new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map: this.map,
        title: "harvest"
      });
    },

    componentWillReceiveProps: function(newProps) {
      var pos = {
        lat: newProps.lat,
        lng: newProps.lng
      };
      var latLng = new google.maps.LatLng(pos.lat, pos.lng);

      this.map.setCenter(pos);
      this.marker.setPosition(latLng);
    },

    render: function() {
      var mapStyle = {
        width: root.screen.availWidth * 0.56,
        height: root.screen.availHeight - 100
      };

      return(
        <div className="map-holder">
          <div id="map" ref="map" className="col-md-7" style={mapStyle}></div>
        </div>
      );
    }
  });

}(this));
