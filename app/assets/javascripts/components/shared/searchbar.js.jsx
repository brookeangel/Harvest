(function(root) {
  root.SearchBar = React.createClass({

    getInitialState: function() {
      return {users: [], matches: []};
    },

    componentWillMount: function() {
      ApiUtil.fetchUsers();
      UserStore.addChangeListener(this._updateUsers);
    },

    componentWillUnmount: function() {
      UserStore.removeChangeListener(this._updateUsers);
    },

    _updateUsers: function() {
      this.setState({users: UserStore.all()});
    },

    _getMatches: function(searchString) {
      var matches = [];
      if(searchString.length > 0){
        this.state.users.forEach(function (user) {
          var sub = user.username.slice(0, searchString.length);
          if(sub.toLowerCase() === searchString.toLowerCase() && matches.length < 6){
            matches.push(user);
          }
        }.bind(this));
      }

      return matches;
    },

    _handleSearch: function(e) {
      var searchString = e.target.value;
      var matches = this._getMatches(searchString);

      if (matches.length > 0) {
        this.setState({matches: matches})
      } else if (searchString.length > 0) {
        this.setState({matches: "No users match your search."})
      }
    },

    render: function() {
      return(
        <div className="collapse navbar-collapse" id="collapse-menu">
          <ul className="nav navbar-nav navbar-left">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                aria-haspopup="true" aria-expanded="false">
                <input type="text"
                  className="form-control"
                  placeholder="Search Users"
                  onChange={this._handleSearch}
                  aria-label="..." />
              </a>
              <ul className="dropdown-menu">
                {this.state.matches.map(function(user) {
                  return (
                    <li key={user.id}>
                      <SearchItem
                        user={user}
                        history={this.props.history} />
                    </li>
                    );
                }.bind(this))}
              </ul>
            </li>
          </ul>
        </div>
      )
    }
  })
}(this));
