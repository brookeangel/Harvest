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
      this.history.pushState(null, "user/" + this.state.user.id + "/edit");
    },

    render: function() {
      var user, website_url, description, editButton;

      if (this.state.user) {
        if (this.state.user.website_url) {
          website_url = <a href={"http://" + this.state.user.website_url}>{this.state.user.website_url}</a>;
        } else {
          website_url = "No website";
        }

        if (this.state.user.description) {
          description = <div className="wrap-text">{this.state.user.description} </div>;
        } else {
          description = "No description yet!";
        }

        if (this.state.user.id === CURRENT_USER) {
          editButton = (
            <div className="btn-group icon-right" role="group" aria-label="...">
              <button type="button" className="btn btn-default" onClick={this._handleEditClick}>
                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
              </button>
            </div>
          );
        }

        user = (
          <div>
            <div className="row pad-top">
              <div className="col-sm-5">
                <img src={this.state.user.profile_img_url} className="img-responsive profile-img"/>
              </div>
              <div className="col-sm-7 relative">
                {editButton}

                <h1 className="text-left black-border-bottom tiny-margin-top">{this.state.user.username}s Profile</h1>
                <h5>
                  {this.state.user.affiliation} &nbsp;|&nbsp;
                  {website_url}
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
