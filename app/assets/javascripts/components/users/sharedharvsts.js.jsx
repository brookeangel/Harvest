(function(root) {

  root.SharedHarvsts = React.createClass({
    getInitialState: function() {
      return {sharedHarvsts: null};
    },

    componentWillMount: function() {
      ApiUtil.fetchSharedHarvsts(CURRENT_USER);
      HarvstStore.addChangeListener(this._updateSharedHarvsts);
    },

    componentWillUnmount: function() {
      HarvstStore.removeChangeListener(this._updateSharedHarvsts);
    },

    _updateSharedHarvsts: function() {
      this.setState({sharedHarvsts: HarvstStore.all()});
    },

    render: function() {
      var sharedHarvsts;
      if (this.state.sharedHarvsts) {
        sharedHarvsts = <UserHarvsts harvsts={this.state.sharedHarvsts}/>;
      }

      return(
        <div className="row profile-page">
          <div className="col-md-8 col-md-offset-2 profile-container text-center">
            <h1>Shared Harvsts</h1>
            {sharedHarvsts}
          </div>
        </div>
      );
    }
  });

}(this));
