import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Table, TableCell, TableBody, TableContainer, TableHead, Paper, TableRow, Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    margin: '10px 0px',
  },
});

const TableComponent = (props) => {
  const { id, data, columns } = props;
  const classes = useStyles();
  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {
              columns.map((column) => (
                <TableCell key={column.label} align={column.align}><Typography color="textSecondary">{column.label}</Typography></TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((trainee) => (
            <TableRow key={trainee[id]}>
              {
                columns.map((column) => (
                  <TableCell key={`${trainee[id]}${column.field}`} align={column.align}>
                    <Typography>
                      {trainee[column.field]}
                    </Typography>
                  </TableCell>
                ))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableComponent.propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(Object).isRequired,
  data: PropTypes.arrayOf(Object).isRequired,
};

export default TableComponent;
