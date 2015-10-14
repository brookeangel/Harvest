(function(root) {

  root.Search = React.createClass({

    getInitialState: function() {
      return {params: ''};
    },

    componentDidMount: function() {

    },

    handleMapClick: function(e) {
      var location = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
    },

    render: function() {
      return(
        <div>
          <HarvstIndex />
          <Map onClick={this._handleMapClick}/>
        </div>
      )
    }
  })

}(this))
