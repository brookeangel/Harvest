(function(root) {

  root.ShowHarvst = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      if (HarvstStore.getHarvst().id == this.props.params.id) {
        return {harvst: HarvstStore.getHarvst()};
      } else {
        return {harvst: null};
      }
    },

    componentWillMount: function() {
      HarvstStore.addChangeListener(this._updateHarvst);
    },

    componentWillUnmount: function() {
      HarvstStore.removeChangeListener(this._updateHarvst);
    },

    _updateHarvst: function() {
      this.setState({harvst: HarvstStore.getHarvst()});
    },

    _handleDeleteClick: function(e) {
      e.preventDefault();
      ApiUtil.deleteHarvst(this.state.harvst.id, function() {
        this.history.pushState("", "");
      }.bind(this));
    },


    _handleEditClick: function(e) {
      e.preventDefault();
      this.history.pushState("", this.state.harvst.id + "/edit");
    },

    render: function() {
      var harvstShowContents = null;
      var deleteButton = null;

      if (this.state.harvst) {
        harvstShowContents = (
          <div className="show-view-body">
            <img src={this.state.harvst.image_url} className="img-responsive img-circle" width="250" height="250"/>
            <h1>{this.state.harvst.title}</h1>
            <p>Posted by {this.state.harvst.user.username} {this.state.harvst.created_at} ago.</p>

            <div className="harvst-details text-left">
              <ShowField label="Details" contents={this.state.harvst.description} harvst={this.state.harvst}/>
              <ShowField label="Address" contents={this.state.harvst.address} harvst={this.state.harvst} />
              <ShowField label="Contact" contents={this.state.harvst.contact} harvst={this.state.harvst} />
              <ShowField label="Privacy" contents={this.state.harvst.privacy} harvst={this.state.harvst} />
              <ShowField label="Expires" contents={this.state.harvst.end_date} harvst={this.state.harvst} />
            </div>
          </div>
        );

        if (this.state.harvst.user.id === CURRENT_USER) {
          deleteButton = (
            <div className="btn-group" role="group" aria-label="...">
              <button type="button" className="btn btn-default" onClick={this._handleDeleteClick}>
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
              </button>
              <button type="button" className="btn btn-default" onClick={this._handleEditClick}>
                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
              </button>
            </div>
          );
        }
      }

      return(
        <div className="container pad-top">
          <div className="row">
            <div className="col-md-5 text-center">
              <div className="text-right">
                {deleteButton}
              </div>
              {harvstShowContents}
            </div>
          </div>
        </div>
      )
    }
  })

}(this));
