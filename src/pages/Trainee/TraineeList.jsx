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
import { limit } from '../../configs/Constants';

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
    console.log(state);
    const response = await callApi('post', '/trainee', state);
    const { data: { message, status, data } = {} } = response;
    if (data) {
      openSnackbar(status, message);
      setOpen(false);
      setLoading(false);
    } else {
      setLoading(false);
      openSnackbar('error', message);
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

  const handleEditDialogSubmit = (openSnackbar, state) => {
    openSnackbar('success', 'Trainee Updated Successfully');
    setEditOpen(false);
    console.log(state);
  };

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
          <Button size="large" variant="outlined" color="primary" onClick={handleClickOpen}>
            Add Trainee
          </Button>
          <EnhancedTable
            id="_id"
            data={trainees.Trainees}
            loader={loading}
            dataLength={trainees.TotalCount}
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
            onSubmit={(addTraineeState) => handleSubmit(openSnackbar, addTraineeState)}
          />
          <EditDialog
            open={editOpen}
            onClose={handleEditDialogClose}
            onSubmit={(editTraineeState) => handleEditDialogSubmit(openSnackbar, editTraineeState)}
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
