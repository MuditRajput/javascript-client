import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, CssBaseline } from '@material-ui/core';
import trainees from './data/Trainee';
import { AddDialog } from './Components';

const TraineeList = (props) => {
  const { match: { path = '' } = {} } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (state) => {
    setOpen(false);
    console.log(state);
  };
  return (
    <>
      <CssBaseline />
      <Button size="large" variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Trainee
      </Button>
      <AddDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
      <ul>
        {
          trainees.map(({ name, id }) => (
            <li key={name}>
              <Link to={`${path}/${id}`}>{name}</Link>
            </li>
          ))
        }
      </ul>
    </>
  );
};

TraineeList.propTypes = {
  match: PropTypes.object.isRequired,
};

export default TraineeList;
