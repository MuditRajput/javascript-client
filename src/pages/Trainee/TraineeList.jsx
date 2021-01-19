import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, CssBaseline } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import trainees from './data/Trainee';
import { AddDialog, EditDialog, DeleteDialog } from './Components';
import { TableComponent } from '../../components';
import { SnackbarContext } from '../../contexts';

const TraineeList = (props) => {
  const { match: { path }, history } = props;
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState();
  const [page, setPage] = useState(0);
  const [details, setDetails] = useState({});
  const [tabledata] = useState({ count: 100, rowsPerPage: 5 });

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

  const handleSubmit = (openSnackbar, state) => {
    openSnackbar('success', 'Trainee Created Successfully');
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

  const handleEditDialogSubmit = (openSnackbar, state) => {
    openSnackbar('success', 'Trainee Updated Successfully');
    setEditOpen(false);
    console.log(state);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDelete = (openSnackbar) => {
    if (details.createdAt >= '2019-02-14') {
      openSnackbar('success', 'Trainee Deleted Successfully');
    } else {
      openSnackbar('error', 'Trainee cannot be Deleted');
    }
    setDeleteOpen(false);
    console.log(details);
  };

  return (
    <SnackbarContext.Consumer>
      {({ openSnackbar }) => (
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
            count={tabledata.count}
            rowsPerPage={tabledata.rowsPerPage}
          />
          <AddDialog
            open={open}
            onClose={handleClick}
            onSubmit={(state) => handleSubmit(openSnackbar, state)}
          />
          <EditDialog
            open={editOpen}
            onClose={handleEditDialogClose}
            onSubmit={(state) => handleEditDialogSubmit(openSnackbar, state)}
            defaultValues={details}
          />
          <DeleteDialog
            open={deleteOpen}
            onClose={handleDeleteClose}
            onDelete={() => handleDelete(openSnackbar)}
          />
        </>
      )}
    </SnackbarContext.Consumer>
  );
};

TraineeList.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
export default TraineeList;
