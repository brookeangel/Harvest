$(function() {
  var root = document.getElementById('content');
  var Route = ReactRouter.Route;
  var Router = ReactRouter.Router;
  var IndexRoute = ReactRouter.IndexRoute;

  var App = React.createClass({
    mixins: [ReactRouter.History],

    render: function() {
      return(
        <div>
          <Navbar history={this.props.history} />
          {this.props.children}
        </div>
      );
    }
  });

  var routes = (
    <Route path='/' component={App}>
      <IndexRoute component={Search} />
      <Route path="user/:id" component={ShowUser} >
        <IndexRoute component={ShowUserDetail} />
        <Route path="edit" component={EditUser} />
      </Route>
      <Route path="user/:id/harvsts" component={MyHarvsts} />
      <Route path=":id" component={HarvstContainer} >
        <Route path="show" component={ShowHarvst} />
        <Route path="edit" component={EditHarvst} />
      </Route>
      <Route path="harvsts/new" component={HarvstForm} />
      <Route path="harvsts/shared" component={SharedHarvsts} />
    </Route>
  );

  if (root) {
    React.render(<Router>{routes}</Router>, root);
  }
});
