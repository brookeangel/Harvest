(function(root) {
  root.SearchBar = React.createClass({

    getInitialState: function() {
      return {matches: [], searchString: ""};
    },

    componentWillMount: function() {
      ApiUtil.fetchUsers();
    },

    _getMatches: function() {
      var users = UserStore.all();
      var searchString = this.state.searchString;
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
      var matches = this._getMatches(this.state.searchString);

      if (matches.length > 0) {
        this.setState({matches: matches});
      } else if (this.state.searchString.length > 0) {
        this.setState({matches: [
          {username: "No users match your search."}
        ]});
      }
    },

    removeSearchString: function() {
      this.setState({searchString: ""});
    },

    render: function() {
      return(
        <ul className="nav navbar-nav">
          <li className="dropdown open">
            <input type="text"
              className="navbar-search form-control"
              placeholder="Search Users"
              onChange={this._handleSearch}
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
              aria-label="..." />
              <ul className="dropdown-menu">
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

// <li class="dropdown open" data-reactid=".0.0.0.1.0"><input type="text" class="navbar-search form-control" placeholder="Search Users" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" aria-label="..." data-reactid=".0.0.0.1.0.0"><ul class="dropdown-menu" data-reactid=".0.0.0.1.0.1"><li data-reactid=".0.0.0.1.0.1.$1"><a href="#" data-reactid=".0.0.0.1.0.1.$1.0">brooke</a></li></ul></li>
