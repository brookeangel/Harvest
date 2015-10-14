(function(root) {

  root.HarvstIndex = React.createClass({
    getInitialState: function() {
      return {harvsts: HarvstStore.all()};
    },

    componentDidMount: function() {
      ApiUtil.fetchHarvsts();
      HarvstStore.addChangeListener(this._updateHarvsts);
    },

    _updateHarvsts: function() {
      this.setState({harvsts: HarvstStore.all()});
    },

    render: function() {
      return(
        <div className="harvst-index">
          <br /><br /><br />
          <div className="harvsts">
            {this.state.harvsts.map(function(harvst) {
              return(
                <HarvstIndexItem key={harvst.id} harvst={harvst} />
              )
            })}
          </div>
        </div>
    )
    }
  });

}(this));
