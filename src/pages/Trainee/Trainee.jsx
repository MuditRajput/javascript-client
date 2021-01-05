import React from 'react';
import Button from '@material-ui/core/Button';
import { AddDialog } from './Components';

const TraineeComponent = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleSubmit = (state) => {
    setOpen(false);
    console.log(state);
  };

  return (
    <>
      <Button size="large" variant="contained" color="primary" onClick={handleClick}>
        Add Trainee
      </Button>
      <AddDialog
        open={open}
        onClose={handleClick}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default TraineeComponent;
