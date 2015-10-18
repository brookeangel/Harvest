(function(root) {


  root.EditHarvst = React.createClass({

    mixins: [React.addons.LinkedStateMixin, ReactRouter.History],
    getInitialState: function() {
      var harvst = HarvstStore.getHarvst();
      return {
        id: harvst.id,
        lat: harvst.lat,
        lng: harvst.lng,
        title: harvst.title,
        description: harvst.description,
        address: harvst.address,
        privacy: harvst.privacy,
        end_date: harvst.end_date,
        image_url: harvst.image_url,
        contact: harvst.contact,
        errors: null
      };
    },

    componentWillMount: function() {
      this._handleRefresh();
      MessageStore.addChangeListener(this._addErrors);
    },

    componentWillUnmount: function() {
      MessageStore.removeChangeListener(this._addErrors);
    },

    _handleRefresh: function() {
      var harvst = HarvstStore.getHarvst();
      if (Object.keys(harvst).length === 0) {
        root.history.back();
      }
    },

    _addErrors: function() {
      var errors = MessageStore.allErrors();
      this.setState({errors: errors});
    },

    _handleSubmit: function(e) {
      e.preventDefault();
      LocationUtil.fetchCoords(this.state.address, this._submitCallback);
    },

    _submitCallback: function() {
      var coords = LocationStore.getCoords();
      var address = LocationStore.getAddress();
      this.setState({
        lat: coords.lat,
        lng: coords.lng,
        address: address});

      var harvst = {};
      Object.keys(this.state).forEach(function(key) {
        harvst[key] = this.state[key];
      }.bind(this))

      ApiUtil.updateHarvst(harvst, function() {
        this.setState(this.blankAttrs);
        this.history.pushState("", this.state.id + "/show");
      }.bind(this));
    },

    _handlePrivacyChange: function(privacy) {
      this.setState({privacy: privacy});
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
        this.setState({errors: ["Image upload failed. Peas try again!"]})
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

      return(
        <div className="col-md-3 col-md-offset-1">

          <div className="text-center margin-bottom margin-top relative">
            <img src={this.state.image_url} className="img-responsive img-circle" width="150" height="150"/>
            <button type="button" className="btn btn-default icon-right" onClick={this._openWidget}>
              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </button>
          </div>

          <h1>Edit Harvest</h1>
          {errors}
          <form className="form-horizontal" onSubmit={this._handleSubmit}>

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
                valueLink={this.linkState("address")} />
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
              <button className="btn btn-default">Update Harvest</button>
            </div>
          </form>
        </div>
      )
    }

  })

}(this));
