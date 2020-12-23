import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, withStyles, Table, TableCell, TableBody, TableContainer,
  TableHead, Paper, TableRow, Typography, TableSortLabel,
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    margin: '10px 0px',
  },
});

const StyledTableCell = withStyles(() => ({
  root: {
    color: '#8b8b8b',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.disabledBackground,
      cursor: 'pointer',
    },
  },
}))(TableRow);

const TableComponent = (props) => {
  const {
    id, data, columns, order, orderBy, onSort, onSelect,
  } = props;
  const classes = useStyles();
  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {
              columns.map((column) => (
                <StyledTableCell align={column.align} key={column.label}>
                  <TableSortLabel
                    hideSortIcon
                    active={orderBy === column.label}
                    direction={order}
                    onClick={() => onSort(column.label)}
                  >
                    <Typography variant="body2">
                      {column.label}
                    </Typography>
                  </TableSortLabel>
                </StyledTableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((trainee) => (
            <StyledTableRow key={trainee[id]} onClick={() => onSelect(trainee[id])}>
              {
                columns.map((column) => (
                  <TableCell key={`${trainee[id]}${column.field}`} align={column.align}>
                    <Typography>
                      {column.format
                        ? column.format(trainee[column.field]) : trainee[column.field]}
                    </Typography>
                  </TableCell>
                ))
              }
            </StyledTableRow>
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
  order: PropTypes.string,
  orderBy: PropTypes.string,
  onSort: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

TableComponent.defaultProps = {
  order: 'asc',
  orderBy: 'name',
};

export default TableComponent;
