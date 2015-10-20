(function(root) {
  root.Comment = React.createClass({

    _handleClick: function() {
      ApiUtil.deleteComment(this.props.comment);
    },

    render: function() {
    var deleteButton;
    if (CURRENT_USER === this.props.comment.user_id) {
      deleteButton = <h6 onClick={this._handleClick}>Delete</h6>;
    }
      return(
        <div>
          {this.props.comment.body}
          {deleteButton}
        </div>
      );
    }

  });
}(this));
