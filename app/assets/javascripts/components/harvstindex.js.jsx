(function(root) {

  root.HarvstIndex = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return {harvsts: HarvstStore.all()};
    },

    componentDidMount: function() {
      HarvstStore.addChangeListener(this._updateHarvsts);
    },

    _updateHarvsts: function() {
      this.setState({harvsts: HarvstStore.all()});
    },

    _handleAddClick: function() {
      var pos = {
        lat: 37.7758,
        lng: -122.435
      };
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.history.pushState(null, "/harvsts/new", pos);
        }.bind(this), function() {
          this.history.pushState(null, "/harvsts/new", pos);
        }.bind(this));
      } else {
        this.history.pushState(null, "/harvsts/new", pos);
      }
    },

    render: function() {

      return(
        <div className="container">
          <div className="harvst-index col-md-5">
            <MapSearch />
            <h4 className="add-harvst-link text-right" onClick={this._handleAddClick}>
              Add Harvest &nbsp;&nbsp;
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </h4>
            <h1>Harvests In Your Area</h1>
              <div className="harvsts">
                {this.state.harvsts.map(function(harvst) {
                  return(
                    <HarvstIndexItem key={harvst.id} harvst={harvst} />
                  );
                })}
              </div>

          </div>
        </div>
    )
    }
  });

}(this));
