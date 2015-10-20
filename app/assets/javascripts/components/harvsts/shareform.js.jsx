(function(root) {
  root.ShareForm = React.createClass({

    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function() {
      return {username: "", shares: [], errors: []};
    },

    componentWillMount: function() {
      ApiUtil.fetchHarvstShares(this.props.harvstId);
      ShareStore.addChangeListener(this._updateShares);
      MessageStore.addChangeListener(this._updateErrors);
    },

    componentWillUnmount: function() {
      ShareStore.removeChangeListener(this._updateShares);
      MessageStore.removeChangeListener(this._updateErrors);
    },

    _updateErrors: function() {
      this.setState({errors: MessageStore.allErrors()});
    },

    _updateShares: function() {
      this.setState({shares: ShareStore.all()});
    },

    _handleSubmit: function(e) {
      ApiUtil.addShare({
        username: this.state.username,
        harvstId: this.props.harvstId
      });
      this.setState({username: ""});
    },

    render: function() {
      return(
        <div className="col-xs-6 col-xs-offset-3">
          <Errors errors={this.state.errors} />
          <div className="input-group" >
            <input type="text"
              className="form-control"
              placeholder="Share Harvst"
              valueLink={this.linkState("username")}/>
            <span className="input-group-addon" onClick={this._handleSubmit}>
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </span>
          </div>
          <div className="text-center pad-top">
            <div>
              {this.state.shares.map(function(share) {
                return(
                  <ShareButton key={share.id} share={share} />
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  });
}(this));
