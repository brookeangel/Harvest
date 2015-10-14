(function(root) {

  root.HarvstForm = React.createClass({

    blankAttrs: {
      lat: "",
      lng: "",
      title: "",
      description: "",
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
      this.setState({
        lat: this.props.location.query.lat,
        lng: this.props.location.query.lng,
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

    render: function() {
      return(
        <div className="row">
          <ShowMap lat={this.state.lat} lng={this.state.lng} />

          <div className="col-md-5">
            <h1>Add Harvest</h1>
            <form onSubmit={this._handleSubmit}>

              <div className="form-group">
                <label htmlFor="harvst_lat">Latitude:</label>
                <input
                  type="text"
                  id="harvst_lat"
                  className="form-control"
                  valueLink={this.linkState("lat")} />
              </div>

              <div className="form-group">
                <label htmlFor="harvst_lng">Longitude:</label>
                <input
                  type="text"
                  id="harvst_lng"
                  className="form-control"
                  valueLink={this.linkState("lng")} />
              </div>

              <textarea
                id="harvst_description"
                className="form-control"
                valueLink={this.linkState("description")}></textarea>

              <button className="btn btn-default">Add Harvest</button>
            </form>
          </div>

        </div>
      )
    }

  });

}(this));
