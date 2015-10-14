(function(root) {

  root.HarvstIndexItem = React.createClass({

    render: function() {
      return(
        <div className="harvst">
          <h2>{this.props.harvst.title}</h2>
          <p>Posted by {this.props.harvst.user.username}</p>
        </div>
      )
    }
  })

}(this))
