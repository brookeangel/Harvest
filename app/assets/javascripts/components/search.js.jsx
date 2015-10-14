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
        <div className="row">
          <Map onClick={this._handleMapClick}/>
          <HarvstIndex />
        </div>
      )
    }
  })

}(this))
