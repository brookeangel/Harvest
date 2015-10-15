(function(root) {

  root.MapSearch = React.createClass({
    render: function() {

      return(
        <div className="input-group">
          <span className="input-group-addon" id="search-addon"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></span>
          <input type="text" className="form-control" placeholder="search by address" aria-describedby="search-addon" />
        </div>
      )
    }
  })

}(this))
