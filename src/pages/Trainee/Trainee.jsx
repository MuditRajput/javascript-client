import React from 'react';
import Button from '@material-ui/core/Button';
import { AddDialog } from './Components';

const TraineeComponent = () => {
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
      <Button size="large" variant="contained" color="primary" onClick={handleClickOpen}>
        Add Trainee
      </Button>
      <AddDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default TraineeComponent;
