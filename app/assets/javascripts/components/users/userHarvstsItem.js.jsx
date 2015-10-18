(function(root) {

  root.UserHarvstsItem = React.createClass({
    mixins: [ReactRouter.History],

    _handleClick: function(e) {
      this.history.pushState(null, this.props.harvst.id + "/show")
    },

    render: function() {
      var style = {
        backgroundImage: 'url(' + this.props.harvst.image_url + ')'
      };

      return(
        <div className="col-sm-3 mini-pad" onClick={this._handleClick}>
          <div className="user-harvst-index-item" style={style} >
            <div className="cover">
              <h2>{this.props.harvst.title}</h2>
            </div>
          </div>
        </div>
      )
    }
  });

}(this));
