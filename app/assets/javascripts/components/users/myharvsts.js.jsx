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
      var userHarvsts, myHarvsts, sharedHarvsts;

      if (this.state.user) {

        if (this.state.user.private_harvsts.length > 0) {
          myHarvsts = this.state.user.private_harvsts.map(function(harvst) {
            return(
              <UserHarvstsItem harvst={harvst} key={harvst.id} />
            );
          });
        } else {
          myHarvsts = <p>You do not have any harvests!</p>;
        }

        if (this.state.user.shared_harvsts.length > 0) {
          sharedHarvsts = this.state.user.shared_harvsts.map(function(harvst) {
            return(
              <UserHarvstsItem harvst={harvst} key={harvst.id} />
            );
          });
        } else {
          sharedHarvsts = <p>No one has shared a harvest with you yet!</p>;
        }

        userHarvsts = (
          <div className="col-md-8 col-md-offset-2 profile-container text-center">
            <h1 className="text-left black-border-bottom">My Harvsts</h1>
            <div className="no-margin row text-center">
              {myHarvsts}
            </div>
            <h1 className="text-right black-border-bottom">Shared Harvsts</h1>
            <div className="no-margin row text-center">
              {sharedHarvsts}
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
