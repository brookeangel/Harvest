(function(root) {
  root.Comment = React.createClass({

    _handleClick: function() {
      ApiUtil.deleteComment(this.props.comment);
    },

    render: function() {
      return(
        <div>
          {this.props.comment.body}
          <h6 onClick={this._handleClick}>Delete</h6>
        </div>
      );
    }

  });
}(this));
