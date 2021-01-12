import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';

const TraineeComponent = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.path}`} component={TraineeList} />
      <Route exact path={`${match.path}/:id`} component={TraineeDetail} />
    </Switch>
  </>
);

TraineeComponent.propTypes = {
  match: PropTypes.object.isRequired,
};

export default TraineeComponent;
