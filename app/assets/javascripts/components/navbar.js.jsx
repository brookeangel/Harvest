(function(root) {

  root.Navbar = React.createClass({
    mixins: [ReactRouter.History],

    _handleLogout: function() {
      root.SessionUtil.logOut();
    },

    _handleProfileClick: function(e) {
      e.preventDefault();
      this.history.pushState(null, "user/" + CURRENT_USER);
    },

    _handleAddHarvestClick: function(e) {
      e.preventDefault();
      this.history.pushState(null, "harvsts/new");
    },

    render: function() {

      return(
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#collapse-menu"
                aria-expanded="false">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Harvst</a>
            </div>

            <form className="navbar-form navbar-left" role="search">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search users" />
              </div>
            </form>


            <div className="collapse navbar-collapse" id="collapse-menu">
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                    aria-haspopup="true" aria-expanded="false">
                    0 Notifications
                  </a>
                  <ul className="dropdown-menu">
                    <li>Notifications will go here.</li>
                  </ul>
                </li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                    aria-haspopup="true" aria-expanded="false">
                    Welcome, {window.CURRENT_USER_USERNAME} <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li><a href="#" onClick={this._handleAddHarvestClick}>Add Harvest</a></li>
                    <li><a href="#">My Harvests</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#" onClick={this._handleProfileClick}>Profile</a></li>
                    <li><a href="#" onClick={this._handleLogout}>Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>


          </div>
        </nav>

      )
    }
  });

}(this));
