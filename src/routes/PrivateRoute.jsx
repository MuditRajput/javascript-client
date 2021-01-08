import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { PrivateLayout } from '../layouts';

const useStyles = makeStyles((theme) => ({
  navBody: {
    margin: theme.spacing(2),
  },
}));

const PrivateRoute = ({ component: Component, ...rest }) => {
  const classes = useStyles();
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <PrivateLayout>
          <div className={classes.navBody}>
            <Component {...matchProps} />
          </div>
        </PrivateLayout>
      )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
