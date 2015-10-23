(function(root) {
  root.HarvstComments = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function() {
      return {body: ""};
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
        notifyable_type: "Harvst",
        user_id: result.user.id
      });
    },

    render: function() {
      return(
        <div>
          <h1 className="text-left black-border-bottom">Comments</h1>
          {this.props.harvst.comments.map(function(comment) {
            return <Comment key={comment.id} comment={comment} history={this.props.history} />;
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
