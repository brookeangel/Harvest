import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './app';
import SessionFormContainer from './session_form/session_form_container';
import HarvestIndexContainer from './harvests/harvest_index_container';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this._ensureLoggedIn = this._ensureLoggedIn.bind(this);
    this._redirectIfLoggedIn = this._redirectIfLoggedIn.bind(this);
  }

  _ensureLoggedIn(nextState, replace) {
    let currentState = this.context.store.getState();
    let loggedIn = Boolean(currentState.session.currentUser);
    if (!loggedIn) {
      replace("/login");
    }
  }

  _redirectIfLoggedIn(nextState, replace) {
    let currentState = this.context.store.getState();
    let loggedIn = Boolean(currentState.session.currentUser);
    if (loggedIn) {
      replace("/");
    }
  }

  render() {
    return(
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={HarvestIndexContainer} onEnter={this._ensureLoggedIn} />
          <Route path="/login" component={SessionFormContainer} onEnter={this._redirectIfLoggedIn} />
          <Route path="/signup" component={SessionFormContainer} onEnter={this._redirectIfLoggedIn} />
        </Route>
      </Router>
    );
  }
}

AppRouter.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default AppRouter;
