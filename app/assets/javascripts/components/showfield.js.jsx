(function(root) {

  root.ShowField = React.createClass({

    mixins: [ReactRouter.History],

    render: function() {
      return(
        <div className="row">
          <div className="col-xs-4 text-right"><b>{this.props.label}</b></div>
          <div className="col-xs-8" id={this.props.label} >{this.props.contents}<br /></div>
        </div>

      )
    }
  })

}(this));
