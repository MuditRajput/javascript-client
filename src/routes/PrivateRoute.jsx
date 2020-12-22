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
  return (
    <>
      <PrivateLayout />
      <div className={classes.navBody}>
        <Switch>
          <Redirect exact path="/" to="/trainee" />
          <Route path="/trainee" render={({ match }) => <TraineeComponent match={match} />} />
          <Route exact path="/text-field-demo" component={TextFieldDemo} />
          <Route exact path="/input-demo" component={InputDemo} />
          <Route exact path="/children-demo" component={ChildrenDemo} />
          <Route default component={NoMatch} />
        </Switch>
      </div>
    </>
  );
};

export default PrivateRoute;
