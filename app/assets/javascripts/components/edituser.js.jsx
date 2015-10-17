(function(root) {

  root.EditUser = React.createClass({
    mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

    getInitialState: function() {
      var user = UserStore.getUser();

      return {
        user: user,
        website_url: "",
        email: "",
        description: "",
        profile_img_url: "",
        errors: []
      };
    },

    componentWillMount: function() {
      MessageStore.addChangeListener(this._addErrors);
      if (this.state.user) {
        this.setState({
          website_url: this.state.user.website_url,
          email: this.state.user.email,
          description: this.state.user.description,
          profile_img_url: this.state.user.profile_img_url
        });
      } else {
        this.history.pushState(null, "user/" + CURRENT_USER);
      }
    },

    componentWillUnmount: function() {
      MessageStore.removeChangeListener(this._addErrors);
    },

    _addErrors: function() {
      this.setState({errors: MessageStore.allErrors()});
    },

    _updateUser: function() {
      this.setState({
        user: UserStore.getUser(),
        website_url: user.website_url,
        email: user.email,
        description: user.description,
        profile_img_url: user.profile_img_url
      });
    },

    _handleSubmit: function(e) {
      e.preventDefault();
      var params = {
        user: {
          website_url: this.state.website_url,
          email: this.state.email,
          description: this.state.description,
          profile_img_url: this.state.profile_img_url
        }
      }
      ApiUtil.updateUser(this.state.user.id, params ,function() {
        this.history.pushState(null, "user/" + this.state.user.id);
      }.bind(this));
    },

    _handleCancelClick: function(e) {
      e.preventDefault();
      this.history.pushState(null, "user/" + this.state.user.id);
    },

    render: function() {
      var user;

      if (this.state.user) {
        user = (
          <div>
            <h1>{this.state.user.username}s Profile</h1>
            <Errors errors={this.state.errors} />
            <div className="row pad-top">
              <div className="col-sm-5">
                <img src={this.state.profile_img_url} className="img-responsive profile-img"/>
              </div>

                <div className="col-sm-7 relative text-center">
                  <form className="form-horizontal">
                    <div className="form-group">
                      <input
                        type="text"
                        id="user_website"
                        placeholder="Website URL"
                        className="form-control"
                        valueLink={this.linkState("website_url")} />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        id="user_website"
                        placeholder="Email"
                        className="form-control"
                        valueLink={this.linkState("email")} />
                    </div>

                    <div className="form-group">
                      <textarea
                        id="user_description"
                        className="form-control"
                        rows="8"
                        placeholder="Description"
                        valueLink={this.linkState("description")}></textarea>
                    </div>

                    <div className="btn-group" role="group" aria-label="...">
                      <button type="button" className="btn btn-default" onClick={this._handleSubmit}>Update Profile</button>
                      <button type="button" className="btn btn-default" onClick={this._handleCancelClick}>
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                      </button>
                    </div>


                </form>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div>
          {user}
        </div>
      );
    }
  });

}(this));
