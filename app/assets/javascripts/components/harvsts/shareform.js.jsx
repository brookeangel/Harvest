(function(root) {
  root.ShareForm = React.createClass({

    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function() {
      return {username: "", shares: []};
    },

    componentWillMount: function() {
      ApiUtil.fetchHarvstShares(this.props.harvst.id);
      ShareStore.addChangeListener(this._updateShares);
    },

    componentWillUnmount: function() {
      ShareStore.removeChangeListener(this._updateShares);
    },


    _updateShares: function() {
      this.setState({shares: ShareStore.all()});
    },

    _handleSubmit: function(e) {
      ApiUtil.addShare({
        username: this.state.username,
        harvstId: this.props.harvst.id
      }, this.generateNotification);
      this.setState({username: ""});
    },

    generateNotification: function(result) {
      ApiUtil.addNotification({
        notifyable_id: result.id,
        notifyable_type: "Share",
        user_id: result.shared_userid
      });
    },

    render: function() {
      return(
        <div>
          <div className="input-group">
            <input type="text"
              className="form-control"
              placeholder="Share Harvst"
              valueLink={this.linkState("username")}/>
            <span className="input-group-addon" onClick={this._handleSubmit}>
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </span>
          </div>
          <div className="pad-top">
            {this.state.shares.map(function(share) {
              return(
                <ShareButton key={share.id} share={share} />
              );
            })}
          </div>
        </div>
      );
    }
  });
}(this));
