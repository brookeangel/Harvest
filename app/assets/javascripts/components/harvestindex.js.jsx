(function(root) {

  root.HarvestIndex = React.createClass({
    getInitialState: function() {
      return {harvests: HarvestStore.all()};
    },

    componentDidMount: function() {
      HarvestStore.addChangeListener(this._updateHarvests);
    },

    _updateHarvests: function() {
      this.setState({harvests: HarvestStore.all()});
    },

    render: function() {
      return(
        <div className="harvest-index">
          <div className="harvests">
            {this.state.harvests.map(function(harvest) {
              return(
                {harvest}
              )
            })}
          </div>
        </div>
    )
    }
  });

}(this));
