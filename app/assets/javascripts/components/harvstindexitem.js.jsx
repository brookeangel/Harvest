(function(root) {

  root.HarvstIndexItem = React.createClass({
    mixins: [ReactRouter.History],

    _handleClick: function() {
      var id = this.props.harvst.id;
      this.history.pushState(null, "show/" + id)
    },

    render: function() {
      var style = {
        backgroundImage: 'url('+ this.props.harvst.image_url +')'
      };

      return(
        <div
          className="harvst-index-item"
          onClick={this._handleClick}
          style={style}>
          <div className="cover">
            <h2>{this.props.harvst.title}</h2>
            <p>Posted by {this.props.harvst.user.username} {this.props.harvst.created_at} ago.</p>
          </div>
        </div>
      )
    }
  })

}(this))
