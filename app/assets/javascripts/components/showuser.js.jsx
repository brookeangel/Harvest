(function(root) {

  root.ShowUser = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return {user: null, userHarvsts: []};
    },

    componentWillMount: function() {
      ApiUtil.fetchUser(parseInt(this.props.routeParams.id));
      UserStore.addChangeListener(this._updateUser);
      ApiUtil.fetchUserHarvsts(parseInt(this.props.routeParams.id));
      HarvstStore.addChangeListener(this._updateUserHarvsts);
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
      var user, harvests;

      if (this.state.user) {
        user = <ShowUserDetail user={this.state.user} />

        harvests = (
          <div>
            <h1>Current Harvests</h1>
            <UserHarvsts harvsts={this.state.userHarvsts}/>
          </div>
        );
      } else {
        user = <div></div>;
      }

      return (
        <div className="row pad-top">
          <div className="col-md-8 col-md-offset-2">
            {this.props.children}
            {harvests}
          </div>
        </div>
      )
    }
  });

}(this));
