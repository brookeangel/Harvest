(function(root) {

  root.Search = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return {params: ''};
    },

    componentDidMount: function() {
      FilterParamsStore.addChangeListener(this._adjustHarvstParams);
    },

    componentWillUnmount: function() {
      FilterParamsStore.removeChangeListener(this._adjustHarvstParams);
    },

    _adjustHarvstParams: function() {
      this.setState({params: FilterParamsStore.filterParams()});
      ApiUtil.fetchHarvsts(this.state.params);
    },

    _handleMapClick: function(e) {
      var location = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };

      LocationUtil.fetchAddress(location.lat, location.lng, function() {
        this.props.history.pushState(null, "/harvsts/new", location);
      }.bind(this));
    },

    render: function() {
      return(
        <div className="row">
          <Map handleMapClick={this._handleMapClick}/>
          <HarvstIndex />
        </div>
      );
    }
  });

}(this));
