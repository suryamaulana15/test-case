import React, {useEffect, useState, Fragment} from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {TableBody, TableFooter, TablePagination} from '@material-ui/core';
import {connect} from "react-redux";
import * as actions from '../../../../../../store/actions';
import {TableBodyComponents} from './Components'
import {Grid, TableHead, InputBase} from "@material-ui/core";
import {isEmpty} from '../../../../../../shared/utility';
import {Loading, TablePaginationActions} from '../../../../../../components/UI'

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 500,
  },
  labelFont: {
    fontSize: '12px'
  },
  divider: {
    height: 28,
    margin: 4
  },
  iconButton: {
    padding: 10,
    backgroundColor: '#0277BD',
    '&:hover': {
      backgroundColor: '#0277BD'
    },
    color: '#FFFFFF',
    borderRadius: 0
  },
  searchRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 'auto'
    // marginTop: theme.spacing(2)
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  }
}));

const columns = [
  { id: 'transaction_date', label: 'Transaction Date' },
  { id: 'finance_account', label: 'Finance Account' },
  { id: 'finance_account_name', label: 'Finance Account Name'},
  { id: 'reference', label: 'Reference'},
  { id: 'amount', label: 'Amount'},
  { id: 'action', label: 'Action'}
]

const List = props => {

  const {
    onFetchFinance,currentPage, finances, counting, loading, changing, formSearch
  } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      onFetchFinance(0, formSearch)
    }, 1000)

    return () => clearTimeout(timer)
  },[onFetchFinance,formSearch, changing])

  const handleChangePage = (event, newPage) => {
    onFetchFinance(newPage, formSearch)
  }

  const classes = useStyles();
  let tableBody = '';

  if(!isEmpty(finances)) {
    const page = currentPage;
    const rowsPerPage = 5;
    const countRows = counting;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, countRows - page * rowsPerPage);

    tableBody = (
      <Fragment>
        <TableBody>
          {finances.map((finance) => (
            <TableBodyComponents
              finance={finance}
              key={finance.id}
              detailed={() => props.show(finance)}
              edited={() => props.edit(finance)}
              deleted={() => props.remove(finance)}
              // deleted={() => {
              //   props.onCloseAlert()
              //   props.onDialogBox('Yakin ingin menghapus data Aset? ', asset, asset.uuid, actions.deleteAsetWakaf)
              // }}
            />
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[rowsPerPage]}
              colSpan={8}
              count={countRows}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Fragment>
    );
  }

  return ( loading ? <Loading/> :
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xl={12} md={12} sm={12} xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {tableBody}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPage: state.finance.page,
    counting: state.finance.count,
    finances: state.finance.finance.data,
    loading: state.finance.loading,
    changing: state.finance.changing
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchFinance: (page, formSearch) => dispatch(actions.fetchFinances(page, formSearch))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);