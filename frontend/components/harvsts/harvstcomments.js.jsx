(function(root) {
  root.HarvstComments = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function() {
      return {comments: [], body: ""};
    },

    componentWillMount: function() {
      ApiUtil.fetchComments(this.props.harvst.id);
      CommentStore.addChangeListener(this._updateComments);
    },

    componentWillReceiveProps: function(nextProps) {
      ApiUtil.fetchComments(nextProps.harvst.id);
    },

    componentWillUnmount: function() {
      CommentStore.removeChangeListener(this._updateComments);
    },

    _updateComments: function() {
      this.setState({comments: CommentStore.all()});
    },

    _handleSubmit: function(e) {
      e.preventDefault();
      ApiUtil.addComment({
        harvst_id: this.props.harvst.id,
        body: this.state.body
      }, this.generateNotification);
      this.setState({body: ""});
    },

    generateNotification: function(result) {
      ApiUtil.addNotification({
        notifyable_id: result.id,
        notifyable_type: "Comment",
        user_id: result.user_to_notify
      });
    },

    render: function() {
      return(
        <div>
          <h1 className="text-left black-border-bottom">Comments</h1>
          {this.state.comments.map(function(comment) {
            return <Comment key={comment.id} comment={comment} history={this.props.history}/>;
          }.bind(this))}
          <form onSubmit={this._handleSubmit}>
            <div className="form-group">
              <textarea
                id="harvst_description"
                className="form-control"
                rows="5"
                valueLink={this.linkState("body")}></textarea>
            </div>
            <div className="text-center">
              <button className="btn btn-default">Add Comment</button>
            </div>
          </form>
        </div>
      );
    }

  });
}(this));
