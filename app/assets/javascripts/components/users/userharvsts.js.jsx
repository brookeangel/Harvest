(function(root) {

  root.UserHarvsts = React.createClass({

    render: function() {
      return(
        <div className="pad-top row no-margin text-center">
          {this.props.harvsts.map(function(harvst) {
            return(
              <UserHarvstsItem harvst={harvst} key={harvst.id} />
            );
          })}
        </div>
      );
    }
  });

}(this));
