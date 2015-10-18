(function(root) {

  root.ShowUserDetail = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return {user: UserStore.getUser()};
    },

    componentWillMount: function() {
      UserStore.addChangeListener(this._updateUser);
    },

    componentWillUnmount: function() {
      UserStore.removeChangeListener(this._updateUser);
    },

    _updateUser: function() {
      this.setState({user: UserStore.getUser()});
    },

    _handleEditClick: function() {
      this.history.pushState(null, "user/" + this.state.user.id + "/edit")
    },

    render: function() {
      var user, website_url, description;

      if (this.state.user) {
        if (this.state.user.website_url) {
          website_url = this.state.user.website_url;
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

                <h5>
                  {this.state.user.affiliation} &nbsp;|&nbsp;
                  <a href={website_url}>{website_url}</a>
                </h5>
                {description}
              </div>
            </div>
          </div>
        );
      }

      return <div>{user}</div>;
    }
  });

}(this));
