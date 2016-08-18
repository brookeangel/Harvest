(function(root) {

  root.Errors = React.createClass({


    render: function() {
      return(
        <div>
          {this.props.errors.map(function(error) {
            return(
              <div className="alert alert-danger">{error}</div>
            );}
          )}
        </div>
      );
    }
  });

}(this));
