import React from 'react';
import PropTypes from 'prop-types';
import { Button, CssBaseline } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import trainees from './data/Trainee';
import { AddDialog, EditDialog, DeleteDialog } from './Components';
import { TableComponent } from '../../components';
import { SnackBarProvider } from '../../contexts';

const TraineeList = (props) => {
  const { match, history } = props;
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [order, setOrder] = React.useState();
  const [orderBy, setOrderBy] = React.useState();
  const [page, setPage] = React.useState(0);
  const [details, setDetails] = React.useState({});
  const [snackValues, setSnackValues] = React.useState({
    status: '', message: '',
  });

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

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSubmit = (state) => {
    setSnackValues({ status: 'success', message: 'Trainee Added Successfully' });
    setSnackbarOpen(true);
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
    setSnackValues({ status: 'success', message: 'Trainee Updated Successfully' });
    setSnackbarOpen(true);
    setEditOpen(false);
    console.log(state);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const snackBarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDelete = () => {
    if (details.createdAt >= '2019-02-14') {
      setSnackValues({ status: 'success', message: 'Trainee Deleted Successfully' });
    } else {
      setSnackValues({ status: 'error', message: 'Trainee cannot be Deleted' });
    }
    setSnackbarOpen(true);
    setDeleteOpen(false);
    console.log(details);
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
        onClose={handleClose}
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
      <SnackBarProvider
        open={snackbarOpen}
        status={snackValues.status}
        message={snackValues.message}
        onClose={snackBarClose}
      />
    </>
  );
};

TraineeList.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
export default TraineeList;
