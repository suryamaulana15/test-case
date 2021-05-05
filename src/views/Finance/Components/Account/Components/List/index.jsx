import React, {useEffect, useState, Fragment} from "react";
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Divider, Fab, IconButton, InputLabel, Select, TableBody, TableFooter, TablePagination} from '@material-ui/core';
import {connect} from "react-redux";
import * as actions from '../../../../../../store/actions';
import {TableBodyComponents} from './Components'
import {FormControl, Grid, TableHead, InputBase} from "@material-ui/core";
import {AddCircle, Search} from "@material-ui/icons";
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
  { id: 'account_name', label: 'Account Name' },
  { id: 'description', label: 'Description' },
  { id: 'account_type', label: 'Account Type'},
  { id: 'action', label: 'Action'}
]

const List = props => {

  const {
    onFetchAccount,currentPage, accounts, counting, loading
  } = props;

  const [formSearch, setFormSearch] = useState({
    sort_field: 'id',
    sort_type: -1,
    search: '',
    search_type: 'name'
  });

  // const [search, setSearch] = useState("");
  // const [searchType, setSearchType] = useState("name");

  useEffect(() => {
    const timer = setTimeout(() => {
      onFetchAccount(0, formSearch)
    }, 1000)

    return () => clearTimeout(timer)
  },[onFetchAccount,formSearch])

  const handleSearch = event => {
    const target = event.target.name;
    event.persist();
    setFormSearch((formSearch) => ({
      ...formSearch,
      [target]: event.target.value
    }));
  };

  const handleChangePage = (event, newPage) => {
    onFetchAccount(newPage, formSearch)
  }

  const classes = useStyles();
  let tableBody = '';

  if(!isEmpty(accounts)) {
    const page = currentPage;
    const rowsPerPage = 5;
    const countRows = counting;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, countRows - page * rowsPerPage);

    tableBody = (
      <Fragment>
        <TableBody>
          {accounts.map((account) => (
            <TableBodyComponents
              account={account}
              key={account.id}
              // detailed={() => props.show(asset)}
              // edited={() => props.edit(asset)}
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
      <br/>
      <Grid container spacing={2}>
        <Grid item xl={8} md={8} sm={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item xl={6} md={6} sm={12} xs={12}>
              <Paper component="form" className={classes.searchSelectRoot} fullWidth>
                <FormControl
                  // error={errorStatus.status && true}
                  variant="outlined" className={classes.formControl} fullWidth>
                  <InputLabel htmlFor="outlined-age-native-simple">Sort Field</InputLabel>
                  <Select
                    fullWidth
                    native
                    defaultValue={formSearch.sort_field}
                    onChange={handleSearch}
                    label="Search Type"
                    inputProps={{
                      name: 'searchType',
                      id: 'outlined-age-native-simple'
                    }}
                    name="sort_field"
                    // inputRef={register}
                  >
                    <option value="id">ID</option>
                    <option value="name">Name</option>
                  </Select>
                  {/* <FormHelperText>{errorStatus.status && errorStatus.status[0]}</FormHelperText> */}
                </FormControl>
              </Paper>
            </Grid>
            <Grid item xl={6} md={6} sm={12} xs={12}>
              <Paper component="form" className={classes.searchSelectRoot}>
                <FormControl
                  // error={errorStatus.status && true}
                  variant="outlined" className={classes.formControl} fullWidth>
                  <InputLabel htmlFor="outlined-age-native-simple">Sort Type</InputLabel>
                  <Select
                    fullWidth
                    native
                    defaultValue={formSearch.sort_type}
                    onChange={handleSearch}
                    label="Sort Type"
                    inputProps={{
                      name: 'sort_type',
                      id: 'outlined-age-native-simple'
                    }}
                    name="sort_type"
                    // inputRef={register}
                  >
                    <option value={-1}>Descending</option>
                    <option value={1}>Ascending</option>
                  </Select>
                  {/* <FormHelperText>{errorStatus.status && errorStatus.status[0]}</FormHelperText> */}
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <br/>

      <Grid container spacing={2}>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Paper component="form" className={classes.searchSelectRoot} fullWidth>
                <FormControl
                  // error={errorStatus.status && true}
                  variant="outlined" className={classes.formControl} fullWidth>
                  <InputLabel htmlFor="outlined-age-native-simple">Search Type</InputLabel>
                  <Select
                    fullWidth
                    native
                    defaultValue={formSearch.search_type}
                    onChange={handleSearch}
                    label="Search Type"
                    inputProps={{
                      name: 'search_type',
                      id: 'outlined-age-native-simple'
                    }}
                    name="search_type"
                    // inputRef={register}
                  >
                    <option value="name">Name</option>
                    <option value="type">Type</option>
                  </Select>
                  {/* <FormHelperText>{errorStatus.status && errorStatus.status[0]}</FormHelperText> */}
                </FormControl>
              </Paper>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Paper className={classes.searchRoot}>
                <InputBase
                  className={classes.input}
                  name="search"
                  placeholder="Search"
                  inputProps={{ 'aria-label': 'Search Account' }}
                  onChange={handleSearch}
                  value={formSearch.search}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton className={classes.iconButton} aria-label="search">
                  <Search />
                </IconButton>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>

        </Grid>
      </Grid>

      <br/>

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
    currentPage: state.account.page,
    counting: state.account.count,
    accounts: state.account.account.data,
    loading: state.account.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAccount: (page, formSearch) => dispatch(actions.fetchAccoutnts(page, formSearch))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);