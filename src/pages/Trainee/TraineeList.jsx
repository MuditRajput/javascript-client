import React from 'react';
import PropTypes from 'prop-types';
import { Button, CssBaseline } from '@material-ui/core';
import moment from 'moment';
import trainees from './data/Trainee';
import { AddDialog } from './Components';
import { TableComponent } from '../../components';

const TraineeList = (props) => {
  const { match, history } = props;
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState();
  const [orderBy, setOrderBy] = React.useState();

  const handleSort = (property) => {
    setOrder(order === 'asc' && orderBy === property ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelect = (property) => {
    history.push(`${match.path}/${property}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const getDateFormatted = (date) => moment(date).format('dddd, MMMM Do yyyy, hh:mm:ss a');

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
      <TableComponent
        id="id"
        data={trainees}
        columns={[
          {
            field: 'name',
            label: 'Name',
          },
          {
            field: 'email',
            label: 'Email Address',
            format: (value) => value && value.toUpperCase(),
          },
          {
            field: 'createdAt',
            label: 'Date',
            align: 'right',
            format: getDateFormatted,
          },
        ]}
        order={order}
        orderBy={orderBy}
        onSort={handleSort}
        onSelect={handleSelect}
      />
      <AddDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

TraineeList.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
export default TraineeList;
