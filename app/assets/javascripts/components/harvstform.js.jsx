(function(root) {

  root.HarvstForm = React.createClass({

    blankAttrs: {
      lat: "",
      lng: "",
      description: '',
    },

    mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

    getInitialState: function() {
      return this.blankAttrs;
    },

    componentDidMount: function() {
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

      //create this action
      ApiUtil.createHarvst(harvst, function() {
        this.history.pushState("", "");
      }.bind(this));

    },

    render: function() {
      var location = this.props.location.query;
      return(
        <div class="new-corgi-form">
          <h1>Add Harvest</h1>
          <form className="newHarvst" onSubmit={this._handleSubmit}>
            <label htmlFor="harvst_lat">Latitude:</label>
            <input
              type="text"
              id="harvst_lat"
              valueLink={this.linkState("lat")} />

            <label htmlFor="harvst_lng">Longitude:</label>
            <input
              type="text"
              id="harvst_lng"
              valueLink={this.linkState("lng")} /><br /><br />

            <label htmlFor="harvst_description">Description</label>
            <textarea
              id="harvst_description"
              valueLink={this.linkState("description")}></textarea><br /><br />
            <button>Add Harvest</button>
          </form>
        </div>
      )
    }

  });

}(this));
