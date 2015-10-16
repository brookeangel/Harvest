(function(root) {

  root.HarvstIndex = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return {harvsts: HarvstStore.all()};
    },

    componentDidMount: function() {
      HarvstStore.addChangeListener(this._updateHarvsts);
    },

    componentWillUnmount: function() {
      HarvstStore.removeChangeListener(this._updateHarvsts);
    },

    _updateHarvsts: function() {
      this.setState({harvsts: HarvstStore.all()});
    },

    render: function() {
      var index;
      if (this.state.harvsts.length > 0) {
        index = (
          <div className="harvsts">
            {this.state.harvsts.map(function(harvst) {
              return(
                <HarvstIndexItem key={harvst.id} harvst={harvst} />
              );
            })}
          </div>
        )
      } else {
        index = (<div className="text-center pad-top">Sorry, no harvests in your area yet!</div>)
      }

      return(
        <div className="container">
          <div className="harvst-index col-md-5">
            <MapSearch history={this.history} />
            <h1>Harvests In Your Area</h1>
            {index}

          </div>
        </div>
    )
    }
  });

}(this));
