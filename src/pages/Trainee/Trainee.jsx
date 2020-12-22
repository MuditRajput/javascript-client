import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';

const TraineeComponent = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.path}`}>
        <TraineeList match={match} />
      </Route>
      <Route exact path={`${match.path}/:id`} render={(routerProps) => <TraineeDetail match={routerProps.match} />} />
    </Switch>
  </>
);

TraineeComponent.propTypes = {
  match: PropTypes.object.isRequired,
};

export default TraineeComponent;
