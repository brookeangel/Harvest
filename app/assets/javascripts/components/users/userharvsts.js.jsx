(function(root) {

  root.UserHarvsts = React.createClass({

    render: function() {

      return(
        <div className="no-margin row text-center">
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
