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

    render: function() {

      return(
        <div className="container">
          <div className="harvst-index col-md-5">
            <MapSearch history={this.history} />
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
