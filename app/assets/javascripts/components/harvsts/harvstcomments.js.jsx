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
      });
      this.setState({body: ""});
    },

    render: function() {
      return(
        <div>
          <form className="form-horizontal" onSubmit={this._handleSubmit}>
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
          {this.state.comments.map(function(comment) {
            return <Comment key={comment.id} comment={comment} />;
          })}
        </div>
      );
    }

  });
}(this));
