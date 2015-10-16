(function(root) {

  root.UserHarvsts = React.createClass({

    render: function() {
      return(
        <div className="pad-top row text-center">
          {this.props.harvsts.map(function(harvst) {
            return(
              <UserHarvstsItem harvst={harvst} key={harvst.id} />
            )
          })}
        </div>
      )
    }
  });

}(this));
