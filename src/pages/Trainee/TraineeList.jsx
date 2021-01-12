import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, CssBaseline } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { AddDialog, EditDialog, DeleteDialog } from './Components';
import { TableComponent, withLoaderAndMessage } from '../../components';
import { SnackbarContext } from '../../contexts';
import { callApi } from '../../lib/utils';

const TraineeList = (props) => {
  const { match, history } = props;
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [order, setOrder] = React.useState();
  const [orderBy, setOrderBy] = React.useState();
  const [page, setPage] = React.useState(0);
  const [details, setDetails] = React.useState({});
  const [trainees, setTrainees] = React.useState({
    Trainees: [], TotalCount: 0,
  });
  const [loading, setLoading] = React.useState(true);

  const EnhancedTable = withLoaderAndMessage(TableComponent);

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

  const handleSubmit = async (openSnackbar, state) => {
    setLoading(true);
    const response = await callApi('post', '/trainee', state);
    if (response.data) {
      const { data: { message } } = response;
      openSnackbar('success', message);
      setOpen(false);
      setLoading(false);
    } else {
      openSnackbar('error', 'Trainee Not Created');
      setLoading(false);
    }
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

  const handleEditDialogSubmit = async (openSnackbar, state) => {
    console.log(state);
    const updatedUser = { originalId: details.originalId, dataToUpdate: state };
    const response = await callApi('put', '/trainee', updatedUser);
    console.log(state);
    console.log(response);
    if (response.data) {
      const { data: { message, status } } = response;
      openSnackbar(status, message);
      setLoading(false);
      setEditOpen(false);
    } else {
      openSnackbar('error', 'Trainee Not Updated');
      setLoading(false);
    }
  };

  const limit = 5;

  const getTrainee = () => {
    const skip = page * limit;
    callApi('get', 'trainee', {}, { skip, limit })
      .then((response) => {
        const { data: { data: { UsersList, totalCount } } } = response;
        setTrainees({ Trainees: UsersList, TotalCount: totalCount });
        localStorage.setItem('Trainees', JSON.stringify(UsersList));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setTrainees([]);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  useEffect(() => {
    getTrainee();
  }, [page, loading]);

  const handleDelete = async (openSnackbar) => {
    console.log(details);
    if (details.createdAt >= '2019-02-14') {
      const response = await callApi('delete', `trainee/${details.originalId}`);
      if (response.data) {
        const { data: { message, status } } = response;
        openSnackbar(status, message);
        setLoading(false);
        setEditOpen(false);
      } else {
        openSnackbar('error', 'Trainee Not Deleted');
        setLoading(false);
      }
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
          <Button size="large" variant="outlined" color="primary" onClick={handleClickOpen}>
            Add Trainee
          </Button>
          <EnhancedTable
            id="_id"
            data={trainees.Trainees}
            loader={loading}
            dataLength={10}
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
            count={trainees.TotalCount}
            rowsPerPage={limit}

          />
          <AddDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            onSubmit={(state) => handleSubmit(openSnackbar, state)}
          />
          <EditDialog
            open={editOpen}
            loading={loading}
            onClose={handleEditDialogClose}
            onSubmit={
              (state) => handleEditDialogSubmit(openSnackbar, state)
            }
            defaultValues={details}
          />
          <DeleteDialog
            open={deleteOpen}
            loading={loading}
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
