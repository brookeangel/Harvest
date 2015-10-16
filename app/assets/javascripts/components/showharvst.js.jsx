(function(root) {

  root.ShowHarvst = React.createClass({

    mixins: [ReactRouter.History],

    getInitialState: function() {
      return {harvst: null};
    },

    componentWillMount: function() {
      ApiUtil.fetchHarvst(parseInt(this.props.routeParams.id));
      HarvstStore.addChangeListener(this._updateHarvst);
    },

    componentWillUnmount: function() {
      HarvstStore.removeChangeListener(this._updateHarvst);
    },

    _updateHarvst: function() {
      this.setState({harvst: HarvstStore.getHarvst()});
    },

    _handleDeleteClick: function(e) {
      e.preventDefault();
      ApiUtil.deleteHarvst(this.state.harvst.id, function() {
        this.history.pushState("", "");
      }.bind(this));
    },

    render: function() {
      var harvstShowContents = null;
      var deleteButton = null;
      var showMap = <div id="map"></div>;

      if (this.state.harvst) {
        harvstShowContents = (
          <div className="show-view-body">
            <img src={this.state.harvst.image_url} className="img-responsive img-circle" width="250" height="250"/>
            <h1>{this.state.harvst.title}</h1>
            <p>Posted by {this.state.harvst.user.username} {this.state.harvst.created_at} ago.</p>
            <div className="harvst-details text-left">
              <p><b>Details: &nbsp;</b>{this.state.harvst.description}</p>
              <p><b>Address: &nbsp;</b>{this.state.harvst.address}</p>
              <p><b>Contact: &nbsp;</b>{this.state.harvst.contact}</p>
              <p><b>Privacy: &nbsp;</b>{this.state.harvst.privacy}</p>
              <p><b>Expires: &nbsp;</b>{this.state.harvst.end_date}</p>
            </div>
          </div>
        )

        showMap = <ShowMap lat={this.state.harvst.lat} lng={this.state.harvst.lng} />;
        if (this.state.harvst.user.id === CURRENT_USER) {
          deleteButton = (
            <button type="button" className="btn btn-default" onClick={this._handleDeleteClick}>
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span> &nbsp; &nbsp; Delete
            </button>
          );
        }
      }

      return(
        <div>
          {showMap}
          <div className="container">
            <div className="row">
              <div className="col-md-5 text-center">
                {harvstShowContents}
                {deleteButton}
              </div>
            </div>
          </div>
        </div>
      )
    }
  })

}(this));
