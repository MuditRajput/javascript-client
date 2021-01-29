import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, CssBaseline } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { useQuery, useMutation } from '@apollo/client';
import { AddDialog, EditDialog, DeleteDialog } from './Components';
import { TableComponent, withLoaderAndMessage } from '../../components';
import { SnackbarContext } from '../../contexts';
import { limit } from '../../configs/Constants';
import { GETALL_TRAINEES } from './query';
import { CREATE_TRAINEE, UPDATE_TRAINEE, DELETE_TRAINEE } from './mutation';

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
    traineeList: [], totalCount: 0,
  });
  const [loading, setLoading] = React.useState(true);
  const { refetch } = useQuery(GETALL_TRAINEES);
  const [createTrainee] = useMutation(CREATE_TRAINEE);
  const [updateTrainee] = useMutation(UPDATE_TRAINEE);
  const [deleteTrainee] = useMutation(DELETE_TRAINEE);

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
    console.log(state);
    const { name, email, password } = state;
    try {
      const response = await createTrainee({ variables: { name, email, password } });
      const { data: { createTrainee: { message, status } = {} } = {} } = response;
      if (status === 'success') {
        openSnackbar(status, message);
        setOpen(false);
      } else {
        openSnackbar('error', message);
      }
      setLoading(false);
    } catch {
      setLoading(false);
      openSnackbar('error', 'Something Went Wrong');
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
    setLoading(true);
    console.log(state);
    const { originalId } = details;
    const { email, name } = state;
    try {
      const response = await updateTrainee({ variables: { id: originalId, email, name } });
      const { data: { updateTrainee: { message = '', status = '' } = {} } = {} } = response;
      if (status === 'success') {
        openSnackbar(status, message);
        setEditOpen(false);
      } else {
        openSnackbar('error', message);
      }
      setLoading(false);
    } catch {
      setLoading(false);
      openSnackbar('error', 'Something Went Wrong');
    }
  };

  const getTrainee = async () => {
    const skip = page * limit;
    try {
      const response = await refetch({ skip, limit });
      const {
        data: {
          getAllTrainees: { data: { UsersList = [], totalCount = 0 } = {} } = {},
        } = {},
      } = response;
      setTrainees({ traineeList: UsersList, totalCount });
      localStorage.setItem('traineeList', JSON.stringify(UsersList));
      setLoading(false);
    } catch {
      setLoading(false);
      setTrainees([]);
    }
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
    setLoading(true);
    console.log(details);
    const { originalId } = details;
    if (details.createdAt <= '2019-02-14') {
      openSnackbar('error', 'Trainee cannot be Deleted');
    } else {
      try {
        const response = await deleteTrainee({ variables: { id: originalId } });
        const { data: { deleteTrainee: { message = {}, status = {} } = {} } = {} } = response;
        if (status === 'success') {
          openSnackbar(status, message);
          setEditOpen(false);
        } else {
          openSnackbar('error', message);
        }
        setLoading(false);
        const { traineeList } = trainees;
        if (page > 0 && traineeList.length === 1) {
          setPage(page - 1);
        }
      } catch {
        openSnackbar('error', 'Something Went Wrong');
      }
    }
    setDeleteOpen(false);
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
            id="originalId"
            data={trainees.traineeList}
            loader={loading}
            dataLength={trainees.totalCount}
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
            count={trainees.totalCount}
            rowsPerPage={limit}

          />
          <AddDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            onSubmit={(addTraineeState) => handleSubmit(openSnackbar, addTraineeState)}
          />
          <EditDialog
            open={editOpen}
            loading={loading}
            onClose={handleEditDialogClose}
            onSubmit={(editTraineeState) => handleEditDialogSubmit(openSnackbar, editTraineeState)}
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
