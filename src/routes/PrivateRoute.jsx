import React from 'react';
import {
  Route, Switch,
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
          <Route exact path="/" component={TraineeComponent} />
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
