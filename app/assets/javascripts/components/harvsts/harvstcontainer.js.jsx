(function(root) {

  root.HarvstContainer = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return ({harvst: null});
    },

    componentWillMount: function() {
      ApiUtil.fetchHarvst(parseInt(this.props.routeParams.id));
      HarvstStore.addChangeListener(this._updateHarvst);
    },

    componentWillUnmount: function() {
      HarvstStore.removeChangeListener(this._updateHarvst);
    },

    _updateHarvst: function() {
      this.setState({harvst: HarvstStore.getHarvst()});
    },

    render: function() {
      var showMap = <div id="map" className="col-md-7"></div>;

      if (this.state.harvst) {
        showMap = <ShowMap lat={this.state.harvst.lat} lng={this.state.harvst.lng} style={this.mapStyle}/>;
      }

      return(
        <div className="row">
          {showMap}
          {this.props.children}
        </div>
      );
    }
  });

}(this));
