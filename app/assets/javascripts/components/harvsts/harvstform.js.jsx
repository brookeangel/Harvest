(function(root) {

  root.HarvstForm = React.createClass({

    blankAttrs: {
      lat: null,
      lng: null,
      title: null,
      description: "This will be the coolest harvest of all time.",
      address: "",
      privacy: "public",
      end_date: null,
      image_url: null,
      image_thumbnail: null,
      contact: null,
      errors: null
    },

    mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

    getInitialState: function() {
      return this.blankAttrs;
    },

    componentWillMount: function() {
      var lat = this.props.location.query.lat;
      var lng = this.props.location.query.lng;

      if (typeof lat === 'undefined' && typeof LocationStore.getCoords().lat === 'undefined') {
        lat = 37.7758;
        lng = -122.435;
      } else if (typeof lat === 'undefined') {
        lat = LocationStore.getCoords().lat;
        lng = LocationStore.getCoords().lng;
      }

      this.setState({
        lat: lat,
        lng: lng
      });

      LocationUtil.fetchAddress(lat, lng);
      MessageStore.addChangeListener(this._addErrors);
      LocationStore.addChangeListener(this._setAddress);
    },

    _setAddress: function() {
      var address = LocationStore.getAddress();
      this.setState({address: address});
      var address_field = document.getElementById("harvst_address");
      address_field.value = address;
    },

    componentDidMount: function() {
      this._setAddress();
    },

    componentWillUnmount: function() {
      MessageStore.removeChangeListener(this._addErrors);
      LocationStore.removeChangeListener(this._setAddress);
    },

    _addErrors: function() {
      var errors = MessageStore.allErrors();
      this.setState({errors: errors});
    },

    _handleSubmit: function(e) {
      e.preventDefault();
      LocationUtil.fetchCoords(this.state.address, this._submitCallback);
    },

    _submitCallback: function(result) {
      var coords = LocationStore.getCoords();
      var address = LocationStore.getAddress();
      this.setState({
        lat: coords.lat,
        lng: coords.lng,
        address: address});

      var harvst = {};
      Object.keys(this.state).forEach(function(key) {
        harvst[key] = this.state[key];
      }.bind(this));

      ApiUtil.addHarvst(harvst, function(result) {
        this.setState(this.blankAttrs);
        this.history.pushState("", result.id + "/show");
      }.bind(this));
    },

    _handlePrivacyChange: function(privacy) {
      this.setState({privacy: privacy});
    },

    _handleAddressChange: function(e) {
      this.setState({address: e.target.value});
    },

    _openWidget: function(e) {
      e.preventDefault();

      cloudinary.openUploadWidget({
        cloud_name: 'harvst',
        upload_preset:'bmx9ikkh',
        max_file_size: 100000,
        theme: 'minimal'
      },
      this._handleWidgetUpload.bind(this));
    },

    _handleWidgetUpload: function(error, result) {
      if (error) {
        this.setState({errors: ["Image upload failed. Peas try again!"]});
      } else if (result) {
        this.setState({
          image_url: result[0].url,
          image_thumbnail: result[0].thumbnail_url
        });
      }
    },

    render: function() {
      var errors = null;
      if (this.state.errors) {
        errors = <Errors errors={this.state.errors} />;
      }

      var photoText;
      var photo = null;

      if (this.state.image_url) {
        photoText = "Edit";
        photo = <p><img src={this.state.image_thumbnail} className="img-rounded"/></p>;
      } else {
        photoText = "  Add Photo";
        photo = <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>;
      }


      return(
        <div className="row pad-top">
          <ShowMap lat={this.state.lat} lng={this.state.lng} />

          <div className="col-md-3 col-md-offset-8">
            <h1>Add Harvest</h1>
            {errors}
            <form className="form-horizontal" onSubmit={this._handleSubmit}>


              <div className="form-group text-center" onClick={this._openWidget}>
                <a className="btn btn-default" href="#" role="button">
                  {photo}
                  {photoText}
                </a>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="harvst_title"
                  placeholder="Harvest Title"
                  className="form-control"
                  valueLink={this.linkState("title")} />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="harvst_address"
                  placeholder="Address"
                  className="form-control"
                  onChange={this._handleAddressChange} />
              </div>

              <div className="form-group">
                <textarea
                  id="harvst_description"
                  className="form-control"
                  rows="5"
                  valueLink={this.linkState("description")}></textarea>
              </div>


              <div className="form-group">
                <input
                  type="text"
                  id="harvst_contact"
                  className="form-control"
                  placeholder="Contact information (optional)"
                  valueLink={this.linkState("contact")} />
              </div>

              <div className="date-inline form-group">
                <label htmlFor="harvst_end_date">End date (optional)</label>
                <input
                  type="date"
                  className="form-control"
                  id="harvst_end_date"
                  valueLink={this.linkState("end_date")} />
              </div>

              <div className="radio">
                <label>
                  <input
                    type="radio"
                    name="harvst_privacy"
                    value="public"
                    id="harvst_privacy_public"
                    defaultChecked
                    onChange={this._handlePrivacyChange.bind(this,'public')} />
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
                    onChange={this._handlePrivacyChange.bind(this,'private')} />
                  Private (only shared users can view)
                </label>
              </div>

              <br />

              <div className="text-center">
                <button className="btn btn-default">Add Harvest</button>
              </div>
            </form>
          </div>
        </div>
      );
    }

  });

}(this));
