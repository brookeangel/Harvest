(function(root) {
  root.NotificationItem = React.createClass({

    _handleClick: function() {
      this.props.history.pushState(null, this.props.notification.harvst_id + "/show");
    },

    render: function() {
      return(
        <li onClick={this._handleClick}>{this.props.notification.message}</li>
      );
    }
  });
}(this));
