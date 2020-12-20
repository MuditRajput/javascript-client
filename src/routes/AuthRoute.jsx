import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { AuthLayout } from '../layouts';
import { NoMatch } from '../pages';

const AuthRoute = () => (
  <Router>
    <Switch>
      <Route path="/login" component={AuthLayout} />
      <Route default component={NoMatch} />
    </Switch>
  </Router>
);

export default AuthRoute;
