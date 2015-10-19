(function(root) {

  root.ShowField = React.createClass({

    mixins: [ReactRouter.History],

    render: function() {
      var contents = "none";
      if (this.props.contents !== "" && this.props.contents !== null) {
        contents = this.props.contents;
      }

      return(
        <div className="row small-margin-bottom">
          <div className="col-xs-4 text-right"><b>{this.props.label}</b></div>
          <div className="col-xs-8" id={this.props.label} >{contents}<br /></div>
        </div>

      );
    }
  });

}(this));
