import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, CssBaseline } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import trainees from './data/Trainee';
import { AddDialog, EditDialog, DeleteDialog } from './Components';
import { TableComponent } from '../../components';

const TraineeList = (props) => {
  const { match: { path }, history } = props;
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState();
  const [page, setPage] = useState(0);
  const [details, setDetails] = useState({});

  const handleSort = (selectedColumn) => {
    setOrder(order === 'asc' && orderBy === selectedColumn ? 'desc' : 'asc');
    setOrderBy(selectedColumn);
  };

  const handleSelect = (selectedTraineeId) => {
    history.push(`${path}/${selectedTraineeId}`);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSubmit = (state) => {
    setOpen(false);
    console.log(state);
  };

  const getDateFormatted = (date) => moment(date).format('dddd, MMMM Do yyyy, hh:mm:ss a');

  const handleEditDialogOpen = (traineeDetails) => {
    setEditOpen(true);
    setDetails(traineeDetails);
  };

  const handleDeleteDialogOpen = (traineeDetails) => {
    setDeleteOpen(true);
    setDetails(traineeDetails);
  };

  const handleEditDialogClose = () => {
    setEditOpen(false);
  };

  const handleEditDialogSubmit = (state) => {
    setEditOpen(false);
    console.log(state);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDelete = () => {
    setDeleteOpen(false);
    console.log(details);
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
        actions={[
          {
            icon: <EditIcon />,
            handler: handleEditDialogOpen,
          },
          {
            icon: <DeleteIcon />,
            handler: handleDeleteDialogOpen,
          },
        ]}
        order={order}
        orderBy={orderBy}
        onSort={handleSort}
        onSelect={handleSelect}
        page={page}
        onChangePage={handleChangePage}
        count={100}
        rowsPerPage={5}
      />
      <AddDialog
        open={open}
        onClose={handleClick}
        onSubmit={handleSubmit}
      />
      <EditDialog
        open={editOpen}
        onClose={handleEditDialogClose}
        onSubmit={handleEditDialogSubmit}
        defaultValues={details}
      />
      <DeleteDialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        onDelete={handleDelete}
      />
    </>
  );
};

TraineeList.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
export default TraineeList;
