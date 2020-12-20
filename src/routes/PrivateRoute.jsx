import React from 'react';
import {
  Route, BrowserRouter as Router, Switch,
} from 'react-router-dom';
import { PrivateLayout } from '../layouts';
import {
  ChildrenDemo, InputDemo, TextFieldDemo, TraineeComponent, NoMatch,
} from '../pages';

const PrivateRoute = () => (
  <Router>
    <PrivateLayout />
    <Switch>
      <Route exact path="/" component={TraineeComponent} />
      <Route path="/text-field-demo" component={TextFieldDemo} />
      <Route path="/input-demo" component={InputDemo} />
      <Route path="/children-demo" component={ChildrenDemo} />
      <Route default component={NoMatch} />
    </Switch>
  </Router>
);

export default PrivateRoute;
