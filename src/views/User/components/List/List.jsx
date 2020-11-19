import React, {Fragment, useEffect} from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableCell,
  TableBody,
  TableFooter, TablePagination
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import * as actions from '../../../../store/actions';
import {connect} from "react-redux";
import {Loading} from "../../../../components/UI";
import TablePaginationActions from "../../../../components/UI/Table/TablePagination";
import User from './User/User';

const useStyles = makeStyles(theme=> ({

}))

const columns = [
  { id: 'nomor', label: 'NO' },
  { id: 'name', label: 'Nama' },
  { id: 'email', label: 'E-mail' },
  { id: 'action', label: 'Action', align: 'right' }
]

const List = props => {
  const classes = useStyles();
  const {users, loading, onFetchUsers,changing} = props;
  const token = sessionStorage.getItem("access_token");
  useEffect(()=> {
    onFetchUsers(1, token);
  },[changing]);

  function isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  const handleChangePage = (event, newPage) => {
    onFetchUsers(newPage, token)
  }

  let tableBody = '';
  if(!isEmpty(users.users)){
    console.log(users)
    const page = users.currentPage - 1;
    const rowsPerPage = users.perPage;
    const countRows = users.totalItems;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, countRows - page * rowsPerPage);

    tableBody = (
      <Fragment>
        <TableBody>
          {users.users.map((user,index) => (
            <User
              user={user}
              key={user.id}
              from={users.from}
              index={index}
            //   // detailed={() => props.show(asset)}
              edited={() => props.edit(user)}
            //   // deleted={() => {
            //   //   props.onCloseAlert()
            //   //   props.onDialogBox('Yakin ingin menghapus data Aset? ', asset, asset.uuid, actions.deleteAsetWakaf)
            //   // }}
            />
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={3} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[props.users.perPage]}
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
    )
  }

  return (loading? <Loading/>
    :<Fragment>
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
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    users: state.user.user,
    loading: state.user.loading,
    changing: state.user.changing
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchUsers: (page, token) => dispatch(actions.fetchUsers(page, token))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(List);