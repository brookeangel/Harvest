(function(root) {

  root.ShowUser = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return {user: null};
    },

    componentWillMount: function() {
      ApiUtil.fetchUser(parseInt(this.props.routeParams.id));
      UserStore.addChangeListener(this._updateUser);
    },

    componentWillUnmount: function() {
      UserStore.removeChangeListener(this._updateUser);
    },

    _updateUser: function() {
      this.setState({user: UserStore.getUser()});
    },

    render: function() {
      var user;
      if (this.state.user) {
        user = <div>{this.state.user.username}</div>;
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
