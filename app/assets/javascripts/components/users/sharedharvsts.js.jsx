(function(root) {

  root.SharedHarvsts = React.createClass({

    render: function() {

      return(
        <div>
          <h1 className="text-right black-border-bottom">Shared Harvsts</h1>
          <UserHarvsts harvsts={this.props.harvsts}/>
        </div>
      );
    }
  });

}(this));

// className="col-md-8 col-md-offset-2 profile-container text-center"
