(function(root) {
  root.Notifications = React.createClass({

    getInitialState: function() {
      return {notifications: []};
    },

    componentWillMount: function() {
      ApiUtil.fetchNotifications();
      NotificationStore.addChangeListener(this._updateNotifications);
    },

    componentWillUnmount: function() {
      NotificationStore.removeChangeListener(this._updateNotifications);
    },

    _updateNotifications: function() {
      this.setState({notifications: NotificationStore.all()});
    },

    _viewNotifications: function() {
      var notificationIds = [];
      this.state.notifications.map(function(notification) {
        notifications.push(notification.id);
      });

      ApiUtil.viewNotifications(notificationIds);
    },

    render: function() {
      return(
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
            aria-haspopup="true" aria-expanded="false">
            {this.state.notifications.length} Notifications
          </a>
          <ul className="dropdown-menu" onClick={this._viewNotifications}>
            {this.state.notifications.map(function(notification) {
              return (
                <NotificationItem
                  history={this.props.history}
                  notification={notification}
                  key={notification.id}/>
              );
            }.bind(this))}
          </ul>
        </li>
      );
    }
  });
}(this));
