(function(root) {
  root.SearchBar = React.createClass({

    getInitialState: function() {
      return {matches: [], searchString: ""};
    },

    componentWillMount: function() {
      ApiUtil.fetchUsers();
    },

    _getMatches: function(searchString) {
      var users = UserStore.all();
      var matches = [];

      if(searchString.length > 0){
        users.forEach(function (user) {
          var sub = user.username.slice(0, searchString.length);
          if(sub.toLowerCase() === searchString.toLowerCase() && matches.length < 6){
            matches.push(user);
          }
        }.bind(this));
      }

      return matches;
    },

    _handleSearch: function(e) {
      this.setState({searchString: e.target.value});
      var matches = this._getMatches(e.target.value);
      this.setState({matches: matches});
    },

    removeSearchString: function() {
      this.setState({searchString: ""});
    },

    render: function() {
      return(
        <ul className="nav navbar-nav navbar-left">
          <li className="dropdown" role="presentation">
            <a className="dropdown-toggle" data-toggle="dropdown" role="button"
              aria-haspopup="true" aria-expanded="false">
              <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
            </a>
            <ul className="dropdown-menu">
              <li>
                <div className="input-group search">
                <input type="text"
                  className="form-control"
                  placeholder="Search Users"
                  onKeyUp={this._handleSearch} />
                </div>
              </li>
              {this.state.matches.map(function(user) {
                return (
                  <li key={user.id}>
                    <SearchItem
                      user={user}
                      removeSearchString={this.removeSearchString}
                      history={this.props.history} />
                  </li>
                  );
              }.bind(this))}
            </ul>
          </li>
        </ul>
      );
    }
  });
}(this));
