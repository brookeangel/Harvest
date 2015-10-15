(function(root) {

  root.ShowHarvst = React.createClass({

    getInitialState: function() {
      return {harvst: null};
    },

    componentWillMount: function() {
      ApiUtil.fetchHarvst(parseInt(this.props.routeParams.id));
      HarvstStore.addChangeListener(this._updateHarvsts);
    },

    componentWillMount: function() {
      HarvstStore.removeChangeListener(this._updateHarvsts);
    },

    _updateHarvsts: function() {
      this.setState({harvst: HarvstStore.getHarvst()});
    },

    render: function() {
      var harvstShowContents = (this.state.harvst) ? this.state.harvst.title : null;
      var showMap;

      if (this.state.harvst) {
        showMap = <ShowMap lat={this.state.harvst.lat} lng={this.state.harvst.lng} />;
      } else {
        showMap = <div id="map"></div>;
      }

      return(
        <div>
          {showMap}
          <div className="container">
            <div className="harvstShow">
              <p>
                {harvstShowContents}
              </p>
            </div>
          </div>
        </div>
      )
    }
  })

}(this));
