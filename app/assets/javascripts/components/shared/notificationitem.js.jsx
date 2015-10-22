(function(root) {
  root.NotificationItem = React.createClass({

    _handleClick: function(e) {
      e.preventDefault();
      this.props.history.pushState(null, this.props.notification.harvst_id + "/show");
    },

    render: function() {
      return(
        <li>
          <a onClick={this._handleClick}>
            {this.props.notification.message}
          </a>
        </li>
      );
    }
  });
}(this));
