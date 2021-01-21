import React from 'react';
import {
  Card, CardContent, Typography, Button, makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { NoMatch } from '..';

const useStyles = makeStyles(() => ({
  buttonBack: {
    margin: '10px',
  },
  card: {
    display: 'flex',
  },
  imageCard: {
    width: '130px',
    background: 'grey',
  },
}
));

const getDateFormatted = (date) => moment(date).format('dddd, MMMM Do yyyy, hh:mm:ss a');

const TraineeDetail = (props) => {
  const classes = useStyles();
  const { match: { params: { id = '' } = {} } = {} } = props;
  const Trainees = JSON.parse(localStorage.getItem('Trainees'));
  const detail = Trainees.find(({ originalId: traineeId } = {}) => traineeId === id);
  if (!detail) {
    return <NoMatch />;
  }
  return (
    <>
      <Card className={classes.card}>
        <img className={classes.imageCard} alt="Thumbnail" />
        <CardContent>
          <Typography variant="h5">{detail.name}</Typography>
          <Typography color="textSecondary">{getDateFormatted(detail.createdAt)}</Typography>
          <Typography>{detail.email}</Typography>
        </CardContent>
      </Card>
      <Typography align="center" className={classes.buttonBack}>
        <Link to="/">
          <Button variant="outlined" color="primary">
            Back
          </Button>
        </Link>
      </Typography>
    </>
  );
};

TraineeDetail.propTypes = {
  match: PropTypes.object.isRequired,
};

export default TraineeDetail;
