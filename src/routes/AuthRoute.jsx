import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthLayout } from '../layouts';
import { NoMatch } from '../pages';

const AuthRoute = () => (
  <Switch>
    <Route path="/login" component={AuthLayout} />
    <Route default component={NoMatch} />
  </Switch>
);

export default AuthRoute;
