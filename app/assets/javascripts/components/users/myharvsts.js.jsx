(function(root) {

  root.MyHarvsts = React.createClass({
    getInitialState: function() {
      return {userHarvsts: null};
    },

    componentWillMount: function() {
      ApiUtil.fetchUserHarvsts(parseInt(this.props.routeParams.id), 'all');
      HarvstStore.addChangeListener(this._updateUserHarvsts);
    },

    componentWillUnmount: function() {
      HarvstStore.removeChangeListener(this._updateUserHarvsts);
    },

    _updateUserHarvsts: function() {
      this.setState({userHarvsts: HarvstStore.all()});
    },

    render: function() {
      var userHarvsts;
      if (this.state.userHarvsts) {
        userHarvsts = <UserHarvsts harvsts={this.state.userHarvsts}/>;
      }

      return(
        <div className="row profile-page">
          <div className="col-md-8 col-md-offset-2 profile-container text-center">
            <h1>My Harvsts</h1>
            {userHarvsts}
          </div>
        </div>
      );
    }
  });

}(this));
