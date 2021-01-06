import React from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { PrivateLayout } from '../layouts';
import {
  ChildrenDemo, InputDemo, TextFieldDemo, TraineeComponent, NoMatch,
} from '../pages';

const useStyles = makeStyles((theme) => ({
  navBody: {
    margin: theme.spacing(2),
  },
}));

const PrivateRoute = () => {
  const classes = useStyles();
  if (localStorage.getItem('token')) {
    return (
      <>
        <PrivateLayout />
        <div className={classes.navBody}>
          <Switch>
            <Redirect exact path="/" to="/trainee" />
            <Route path="/trainee" render={(routerProps) => <TraineeComponent match={routerProps.match} history={routerProps.history} />} />
            <Route exact path="/text-field-demo" component={TextFieldDemo} />
            <Route exact path="/input-demo" component={InputDemo} />
            <Route exact path="/children-demo" component={ChildrenDemo} />
            <Redirect exact path="/logout" to="/login" />
            <Route default component={NoMatch} />
          </Switch>
        </div>
      </>
    );
  }
  return (
    <Switch>
      <Redirect path="/" to="/login" />
    </Switch>
  );
};

export default PrivateRoute;
