(function(root) {

  root.HarvstForm = React.createClass({

    blankAttrs: {
      lat: "",
      lng: "",
      title: "",
      description: "Tell us a little more about your harvest.",
      address: "",
      privacy: "",
      end_date: "",
      image_url: "",
      contact: ""
    },

    mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

    getInitialState: function() {
      return this.blankAttrs;
    },

    componentWillMount: function() {
      var lat = this.props.location.query.lat;
      var lng = this.props.location.query.lng;

      this.setState({
        lat: lat,
        lng: lng
      });
      LocationUtil.fetchAddress(lat, lng);
      LocationStore.addChangeListener(this._setAddress);
    },

    _updateCoords: function() {
      LocationUtil.fetchCoords(this.state.address);
      LocationStore.addChangeListener(function() {
        coords = LocationStore.getCoords();
        this.setState({
          lat: coords.lat;
          lng: coords.lng;
        });
      });
    },

    _handleSubmit: function(e) {
      e.preventDefault();
      var harvst = {};
      Object.keys(this.state).forEach(function(key) {
        harvst[key] = this.state[key];
      }.bind(this))
      this.setState(this.blankAttrs);

      ApiUtil.createHarvst(harvst, function() {
        this.history.pushState("", "");
      }.bind(this));

    },

    _setAddress: function() {
      var address = LocationStore.getAddress();
      this.setState({address: LocationStore.getAddress()});
    },

    _handleAddressChange: function(e) {
      var newAddress = e.target.value;
      this.setState({address: newAddress});
      debugger;
    },

    render: function() {
      return(
        <div className="row">
          <ShowMap lat={this.state.lat} lng={this.state.lng} />

          <div className="col-md-5">
            <h1>Add Harvest</h1>
            <form className="form-horizontal" onSubmit={this._handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="harvst_title"
                  placeholder="Harvest Title"
                  className="form-control"
                  valueLink={this.linkState("title")} />
              </div>

              <textarea
                id="harvst_description"
                className="form-control"
                rows="5"
                valueLink={this.linkState("description")}></textarea>

              <div className="form-group">
                <input
                  type="text"
                  id="harvst_address"
                  className="form-control"
                  placeholder="Address"
                  onChange={this._handleAddressChange}
                  value={this.state.address} />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="harvst_contact"
                  className="form-control"
                  placeholder="Contact information (optional)"
                  valueLink={this.linkState("contact")} />
              </div>

              <div className="radio">
                <label>
                  <input
                    type="radio"
                    name="harvst_privacy"
                    value="public"
                    id="harvst_privacy_public"
                    radioLink={this.linkState("privacy")} />
                  Public (anyone can view this harvest)
                </label>
              </div>

              <div className="radio">
                <label>
                  <input
                    type="radio"
                    name="harvst_privacy"
                    value="private"
                    id="harvst_privacy_private"
                    radioLink={this.linkState("privacy")} />
                  Private (only shared users can view this harvest)
                </label>
              </div>

              <div className="date">
                <label htmlFor="harvst_end_date">Harvest ends:</label>
                <input
                  type="date"
                  id="harvst_end_date"
                  radioLink={this.linkState("end_date")} />
              </div>


              <button className="btn btn-default">Add Harvest</button>
            </form>
          </div>

        </div>
      )
    }

  });

}(this));
