(function(root) {
  root.Comment = React.createClass({

    _handleClick: function(e) {
      e.preventDefault();
      ApiUtil.deleteComment(this.props.comment);
    },

    _handleUserclick: function(e) {
      e.preventDefault();
      this.props.history.pushState(null, "user/" + this.props.comment.user_id);
    },

    render: function() {
    var deleteButton;
    if (CURRENT_USER === this.props.comment.user_id) {
      deleteButton = <a href="#" onClick={this._handleClick}>Delete</a>;
    }
      return(
        <div className="comment text-left">
          <div className="comment-body">
            {this.props.comment.body}
          </div>
          <div className="comment-details">
            <div className="float-left">
              Posted by &nbsp;
              <a href="#" onClick={this._handleUserClick}>{this.props.comment.user_username}</a>
              &nbsp;
              {this.props.comment.created_at} ago &nbsp;
            </div>
            <div className="float-right">
              {deleteButton}
            </div>
          </div>
        </div>
      );
    }

  });
}(this));
