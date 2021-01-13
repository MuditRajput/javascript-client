import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, CssBaseline } from '@material-ui/core';
import moment from 'moment';
import trainees from './data/Trainee';
import { AddDialog } from './Components';
import { TableComponent } from '../../components';

const TraineeList = (props) => {
  const { match: { path = '' } = {}, history = {} } = props;
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const handleSort = (property) => {
    setOrder(order === 'asc' && orderBy === property ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelect = (property) => {
    history.push(`${path}/${property}`);
  };

  const getDateFormatted = (date) => moment(date).format('dddd, MMMM Do yyyy, hh:mm:ss a');

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSubmit = (state) => {
    setOpen(false);
    console.log(state);
  };
  return (
    <>
      <CssBaseline />
      <Button size="large" variant="outlined" color="primary" onClick={handleClick}>
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
        onClose={handleClick}
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
