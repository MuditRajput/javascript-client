import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';

const TraineeComponent = ({ match, history }) => (
  <>
    <Switch>
      <Route exact path={`${match.path}`}>
        <TraineeList match={match} history={history} />
      </Route>
      <Route exact path={`${match.path}/:id`} render={(routerProps) => <TraineeDetail match={routerProps.match} />} />
    </Switch>
  </>
);

TraineeComponent.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default TraineeComponent;
