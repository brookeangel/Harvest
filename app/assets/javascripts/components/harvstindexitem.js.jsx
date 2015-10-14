(function(root) {

  root.HarvstIndexItem = React.createClass({

    render: function() {
      return(
        <div className="harvst">
          <h2>{this.props.harvst.title}</h2>
          <p>{this.props.harvst.address}</p>
          <p>Posted by {this.props.harvst.user.username}</p>
        </div>
      )
    }
  })

}(this))
