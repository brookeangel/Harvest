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

    _handleEditClick: function() {
      // this.history.pushState(null, )
    },

    render: function() {
      var user, website, description;

      if (this.state.user) {
        if (this.state.user.website_url) {
          website_url = <p><b>Website:</b> {this.state.user.website_url} </p>;
        } else {
          website_url = "";
        }

        if (this.state.user.description) {
          description = <p>{this.state.user.description} </p>;
        } else {
          description = "No description yet!";
        }

        user = (
          <div>
            <h1>{this.state.user.username}s Profile</h1>
            <div className="row pad-top">
              <div className="col-sm-5">
                <img src={this.state.user.profile_img_url} className="img-responsive profile-img"/>
              </div>
              <div className="col-sm-7 relative">
                <div className="btn-group icon-right" role="group" aria-label="...">
                  <button type="button" className="btn btn-default" onClick={this._handleEditClick}>
                    <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                  </button>
                </div>

                <h5>{this.state.user.affiliation}</h5>
                {website}
                {description}
              </div>
            </div>
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
            {user}
          </div>
        </div>
      )
    }
  });

}(this));
