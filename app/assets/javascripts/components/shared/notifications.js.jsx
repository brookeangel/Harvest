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

    render: function() {
      return(
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
            aria-haspopup="true" aria-expanded="false">
            {this.state.notifications.length} Notifications
          </a>
          <ul className="dropdown-menu">
            {this.state.notifications.map(function(notification) {
              return <li>{notification.notifyable_id} {notification.notifyable_type}</li>;
            })}
          </ul>
        </li>
      );
    }
  });
}(this));
