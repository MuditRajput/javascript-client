import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthLayout } from '../layouts';
import { NoMatch } from '../pages';

const AuthRoute = () => (
  <Switch>
    <Route path="/login" render={({ history }) => <AuthLayout history={history} />} />
    <Route default component={NoMatch} />
  </Switch>
);

export default AuthRoute;
