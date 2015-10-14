(function(root) {

  root.ShowMap = React.createClass({
    componentDidMount: function() {

      var map = React.findDOMNode(this.refs.map);
      var mapOptions = {
        center: {lat: this.props.harvst.lat, lng: this.props.harvst.lng},
        zoom: 13
      };

      this.map = new google.maps.Map(map, mapOptions);
      this.marker = new google.maps.Marker({
        position: {lat: this.props.harvst.lat, lng: this.props.harvst.lng},
        map: this.map,
        title: this.props.harvst.title
      });

    },

    render: function() {
      return(
        <div id="map" ref="map" className="col-md-7"></div>
      )
    }
  });

}(this));
