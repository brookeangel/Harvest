(function(root) {

  root.ShowUser = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return {user: null, userHarvsts: []};
    },

    componentWillMount: function() {
      ApiUtil.fetchUser(parseInt(this.props.routeParams.id));
      // ApiUtil.fetchUserHarvsts(parseInt(this.props.routeParams.id), 'public');
      UserStore.addChangeListener(this._updateUser);
      // HarvstStore.addChangeListener(this._updateUserHarvsts);
    },

    componentWillReceiveProps: function (newProps) {
      ApiUtil.fetchUser(parseInt(newProps.params.id));
      // ApiUtil.fetchUserHarvsts(parseInt(newProps.params.id));
    },

    componentWillUnmount: function() {
      UserStore.removeChangeListener(this._updateUser);
      // HarvstStore.removeChangeListener(this._updateUserHarvsts);
    },

    _updateUser: function() {
      this.setState({user: UserStore.getUser()});
    },

    // _updateUserHarvsts: function() {
    //   this.setState({userHarvsts: HarvstStore.all()});
    // },

    render: function() {
      var harvests;

      if (this.state.user && this.state.user.harvsts.length > 0) {
        harvests = <UserHarvsts harvsts={this.state.user.harvsts}/>;
      } else {
        harvests = <p>"This user has no current harvests."</p>;
      }


      return (
        <div className="row profile-page">
          <div className="col-md-8 col-md-offset-2 profile-container">
            {this.props.children}
            <h1 className="black-border-bottom text-left">Current Harvests</h1>
            {harvests}
          </div>
        </div>
      );
    }
  });

}(this));
