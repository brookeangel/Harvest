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
      if(root.confirm("Are you sure you want to delete this harvest?")) {
        ApiUtil.deleteHarvst(this.state.harvst.id, function() {
          this.history.pushState("", "");
        }.bind(this));
      }
    },


    _handleEditClick: function(e) {
      e.preventDefault();
      this.history.pushState("", this.state.harvst.id + "/edit");
    },

    _handleUserClick: function(e) {
      e.preventDefault();
      this.history.pushState("", "user/" + this.state.harvst.user.id);
    },

    render: function() {
      var harvstShowContents, deleteButton, shareForm;

      if (this.state.harvst) {
        if (this.state.harvst.user.id === CURRENT_USER) {
          deleteButton = (
            <div className="btn-group icon-right" role="group" aria-label="...">
              <button type="button" className="btn btn-default" onClick={this._handleDeleteClick}>
                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
              </button>
              <button type="button" className="btn btn-default" onClick={this._handleEditClick}>
                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
              </button>
            </div>
          );

          shareForm = <ShareForm harvstId={this.state.harvst.id} />;
        }

        harvstShowContents = (
          <div className="show-view-body">
            <div className="relative margin-top">
              <img src={this.state.harvst.image_url} className="img-responsive img-circle" width="250" height="250"/>
            </div>
            <h1>{this.state.harvst.title}</h1>
            <p>Posted by <a href="#" onClick={this._handleUserClick} >{this.state.harvst.user.username}</a> {this.state.harvst.created_at} ago.</p>

            <div className="harvst-details text-left">
              <ShowField label="Details" contents={this.state.harvst.description} harvst={this.state.harvst}/>
              <ShowField label="Address" contents={this.state.harvst.address} harvst={this.state.harvst} />
              <ShowField label="Contact" contents={this.state.harvst.contact} harvst={this.state.harvst} />
              <ShowField label="Privacy" contents={this.state.harvst.privacy} harvst={this.state.harvst} />
              <ShowField label="Expires" contents={this.state.harvst.end_date} harvst={this.state.harvst} />
            </div>
            <HarvstComments harvst={this.state.harvst}  history={this.history} />
          </div>
        );

      }

      return(
        <div className="pad-top">
          <div className="row">
            <div className="col-md-5 text-center">
              <div className="text-right">
                {deleteButton}
              </div>
              {harvstShowContents}
              {shareForm}
            </div>
          </div>
        </div>
      );
    }
  });

}(this));
