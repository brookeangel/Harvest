(function(root) {

  root.HarvstIndexItem = React.createClass({
    mixins: [ReactRouter.History],

    _handleClick: function() {
      var id = this.props.harvst.id;
      this.history.pushState(null, "show/" + id)
    },

    render: function() {
      return(
        <div className="harvst" onClick={this._handleClick}>
          <h2>{this.props.harvst.title}</h2>
          <p>Posted by {this.props.harvst.user.username}</p>
        </div>
      )
    }
  })

}(this))
