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
import Product from './Product/Product';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme=> ({

}))

const columns = [
  { id: 'nomor', label: 'NO' },
  { id: 'name', label: 'Nama' },
  { id: 'email', label: 'Deskripsi' },
  { id: 'action', label: 'Action', align: 'center' }
]

const List = props => {
  const classes = useStyles();
  const {products, loading, onFetchProducts,changing} = props;

  useEffect(()=> {
    // onClearUserAkses()
    onFetchProducts(1);
  },[changing]);

  function isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  const handleChangePage = (event, newPage) => {
    onFetchProducts(newPage)
  }

  let tableBody = '';
  if(!isEmpty(products.products)){
    const page = products.current_page - 1;
    const rowsPerPage = products.per_page;
    const countRows = products.total;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, countRows - page * rowsPerPage);

    tableBody = (
      <Fragment>
        <TableBody>
          {products.products.map((product,index) => (
            <Product
              product={product}
              key={product.id}
              from={products.from}
              index={index}
              deleted={() => {
                props.onDeleteProduk(product.id)
              }}
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
              rowsPerPageOptions={[products.per_page]}
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
    products: state.product.product,
    loading: state.product.loading,
    changing: state.product.changing
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchProducts: (page) => dispatch(actions.fetchProducts(page)),
    // onClearUserAkses: () => dispatch(actions.clearUserAkses()),
    onDeleteProduk: (id) => dispatch(actions.deleteProduct(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(List);