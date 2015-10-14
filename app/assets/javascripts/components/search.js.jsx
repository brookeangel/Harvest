(function(root) {

  root.Search = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return {params: ''};
    },

    componentDidMount: function() {
      FilterParamsStore.addChangeListener(function() {
        this.setState({params: FilterParamsStore.filterParams()});
        ApiUtil.fetchHarvsts(this.state.params);
      }.bind(this));
    },

    _handleMapClick: function(e) {
      var location = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };

      this.props.history.pushState(null, "/harvsts/new", location);
    },

    render: function() {
      return(
        <div className="row">
          <Map handleMapClick={this._handleMapClick}/>
          <HarvstIndex />
        </div>
      )
    }
  })

}(this))
