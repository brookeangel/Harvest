(function(root) {

  root.ShowHarvst = React.createClass({

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

    render: function() {
      var harvstShowContents = null;

      if (this.state.harvst) {
        harvstShowContents = (
          <div>
            <img src={this.state.harvst.image_url} className="img-responsive img-circle"/>
            <h1>{this.state.harvst.title}</h1>
            <p>Posted by {this.state.harvst.username}</p>
            <p>{this.state.harvst.address}</p>
            <p>{this.state.harvst.contact}</p>
            <p>{this.state.harvst.privacy}</p>
            <p>{this.state.harvst.created_at}</p>
            <p>{this.state.harvst.end_date}</p>
          </div>
        )
      }

      var showMap;

      if (this.state.harvst) {
        showMap = <ShowMap lat={this.state.harvst.lat} lng={this.state.harvst.lng} />;
      } else {
        showMap = <div id="map"></div>;
      }

      return(
        <div>
          {showMap}
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-md-offset-1">
                {harvstShowContents}
              </div>
            </div>
          </div>
        </div>
      )
    }
  })

}(this));
