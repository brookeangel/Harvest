(function(root) {

  root.HarvstIndexItem = React.createClass({

    _handleClick: function(e) {
      var id = this.props.harvst.id;
      this.props.history.pushState(null, id + "/show");
    },

    _handleHover: function(e) {
      HarvstActions.receiveOne(this.props.harvst);
    },

    _handleLeave: function(e) {
      HarvstActions.receiveOne(null);
    },

    render: function() {
      var style = {
        backgroundImage: 'url('+ this.props.harvst.image_url +')'
      };

      return(
        <div
          className="harvst-index-item"
          onClick={this._handleClick}
          onMouseOver={this._handleHover}
          onMouseLeave={this._handleLeave}
          style={style}>
          <div className="cover">
            <h2>{this.props.harvst.title}</h2>
            <p>Posted by {this.props.harvst.user.username} {this.props.harvst.created_at} ago.</p>
          </div>
        </div>
      );
    }
  });

}(this));
