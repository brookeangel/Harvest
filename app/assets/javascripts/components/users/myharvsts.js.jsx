(function(root) {

  root.MyHarvsts = React.createClass({
    getInitialState: function() {
      return {user: null};
    },

    componentWillMount: function() {
      ApiUtil.fetchUser(CURRENT_USER);
      UserStore.addChangeListener(this._updateUser);
    },

    componentWillUnmount: function() {
      UserStore.removeChangeListener(this._updateUser);
    },

    _updateUser: function() {
      this.setState({user: UserStore.getUser()});
    },

    render: function() {
      var userHarvsts;
      if (this.state.user) {
        userHarvsts = (
          <div className="col-md-8 col-md-offset-2 profile-container text-center">
            <h1 className="text-left black-border-bottom">My Harvsts</h1>
            <div className="no-margin row text-center">
              {this.state.user.private_harvsts.map(function(harvst) {
                return(
                  <UserHarvstsItem harvst={harvst} key={harvst.id} />
                );
              })}
            </div>
            <h1 className="text-right black-border-bottom">Shared Harvsts</h1>
            <div className="no-margin row text-center">
              {this.state.user.shared_harvsts.map(function(harvst) {
                return(
                  <UserHarvstsItem harvst={harvst} key={harvst.id} />
                );
              })}
            </div>
          </div>
        );
      }

      return(
        <div className="row profile-page">
          {userHarvsts}
        </div>
      );
    }
  });

}(this));
