(function(root) {

  root.MapSearch = React.createClass({
    getInitialState: function() {
      return ({address: ""});
    },

    _handleChange: function(e) {
      this.setState({address: e.target.value});
    },

    _handleSubmit: function(e) {
      e.preventDefault();
      LocationUtil.fetchCoords(this.state.address, function() {});
      e.target.value = '';
    },

    _handleAddClick: function() {
      var coords, location;
      if (this.state.address.length === 0) {
        coords = LocationStore.getCoords();
        location = {
          lat: coords.lat,
          lng: coords.lng
        };
        this.props.history.pushState(null, "/harvsts/new", location);
      } else {
        LocationUtil.fetchCoords(this.state.address, function() {
          coords = LocationStore.getCoords();
          location = {
            lat: coords.lat,
            lng: coords.lng
          };
          this.props.history.pushState(null, "/harvsts/new", location);
        }.bind(this));
      }
    },

    render: function() {
      return(
        <div className="input-group pad-top">
          <span
            className="input-group-addon"
            id="search-addon"
            onClick={this._handleSubmit} >
            <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="search by address"
            aria-describedby="search-addon"
            onChange={this._handleChange} />
          <span
            className="input-group-addon"
            alt="Add Harvest"
            onClick={this._handleAddClick}>
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </span>
        </div>
      )
    }
  })

}(this))
