(function(root) {

  root.ShowUser = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return {user: null, userHarvsts: []};
    },

    componentWillMount: function() {
      ApiUtil.fetchUser(parseInt(this.props.routeParams.id));
      ApiUtil.fetchUserHarvsts(parseInt(this.props.routeParams.id), 'public');
      UserStore.addChangeListener(this._updateUser);
      HarvstStore.addChangeListener(this._updateUserHarvsts);
    },

    componentWillReceiveProps: function (newProps) {
      ApiUtil.fetchUser(parseInt(newProps.params.id));
      ApiUtil.fetchUserHarvsts(parseInt(newProps.params.id));
    },

    componentWillUnmount: function() {
      UserStore.removeChangeListener(this._updateUser);
      HarvstStore.removeChangeListener(this._updateUserHarvsts);
    },

    _updateUser: function() {
      this.setState({user: UserStore.getUser()});
    },

    _updateUserHarvsts: function() {
      this.setState({userHarvsts: HarvstStore.all()});
    },

    render: function() {
      var harvests;

      if (this.state.user) {
        harvests = (
          <div>
            <h1>Current Harvests</h1>
            <UserHarvsts harvsts={this.state.userHarvsts}/>
          </div>
        );
      }

      return (
        <div className="row profile-page">
          <div className="col-md-8 col-md-offset-2 profile-container">
            {this.props.children}
            {harvests}
          </div>
        </div>
      )
    }
  });

}(this));
