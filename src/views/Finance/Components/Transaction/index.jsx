import React , {Fragment, useEffect, useState} from "react";
import {
  List,Create, Update
} from './Components';
import * as actions from '../../../../store/actions';
import {connect} from "react-redux";
import {
  Divider,
  Fab,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText, Button, DialogActions
} from "@material-ui/core";
import {AddCircle, Search} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {Modal} from '../../../../components/UI';
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  btnAdd: {
    backgroundColor: '#569AD3',
    '&:hover': {
      backgroundColor: '#488CC7'
    },
    color: '#FFFFFF',
    // width: '100%',
    justifyContent: 'left'
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
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

const Transaction = props => {
  const classes = useStyles();

  const [Form, setForm] = useState('');
  const [modalState, setModalState] = useState({
    open: false,
    title: '',
    maxWidth: 'sm',
  });

  const closedModalDialog = () => {
    setModalState({
      maxWidth: 'sm',
      title: '',
      open: false,
    });
    setForm('');
  };

  const [removeData, setRemoveData] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const add = () => {
    setModalState({
      open: true,
      title: 'Create New Finance',
      maxWidth: 'sm'
    });
    setForm(<Create/>);
  }

  const edit = (account, formSearch) => {
    account.formSearch = formSearch;
    setModalState({
      open: true,
      title: 'Edit Finance',
      maxWidth: 'sm'
    });

    setForm(<Update account={account} page={page} closedModalDialog={() => closedModalDialog()}/>);
  }

  const remove = (account, formSearch) => {
    account.formSearch = formSearch
    setRemoveData(account);
    setOpenDialog(true);
  }

  const [formSearch, setFormSearch] = useState({
    sort_field: 'id',
    sort_type: -1,
    search: '',
    search_type: 'title'
  });

  const handleSearch = event => {
    const target = event.target.name;
    event.persist();
    setFormSearch((formSearch) => ({
      ...formSearch,
      [target]: event.target.value
    }));
  };

  const {
    onGetCountFinance,changing,changingUpdate,page,onDelete,changingDelete
  } = props;

  useEffect(() => {
    closedModalDialog();
    const timer = setTimeout(() => {
      onGetCountFinance(formSearch);
    }, 1000)

    return () => clearTimeout(timer);
  },[onGetCountFinance,changing,changingUpdate,formSearch,changingDelete]);

  return (
    <Fragment>
      <Modal
        maxWidth={modalState.maxWidth}
        open={modalState.open}
        title={modalState.title}
        onCloseModal={closedModalDialog}
        contentModal={Form}
      />
      <Grid container justify={"space-between"}>
        <Grid item>
          <h3>
            All Finance Transactions
          </h3>
        </Grid>
        <Grid item>
          <Fab variant="extended" className={classes.btnAdd} onClick={add}>
            <AddCircle className={classes.extendedIcon}/>
            Transaction
          </Fab>
        </Grid>
      </Grid>
      <>
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
                        name: 'sort_field',
                        id: 'outlined-age-native-simple'
                      }}
                      name="sort_field"
                      // inputRef={register}
                    >
                      <option value="id">ID</option>
                      <option value="title">Reference</option>
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
                      <option value="title">Reference</option>
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
                    inputProps={{ 'aria-label': 'Search Finance' }}
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
      </>
      <List formSearch={formSearch} edit={(account) => edit(account, formSearch)} remove={(account) => remove(account, formSearch)}/>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete "+removeData.title }</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Batal
          </Button>
          <Button onClick={() => {
            onDelete(removeData.id, page, removeData.formSearch)
            handleCloseDialog()
          }} color="primary" autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    changing: state.finance.changing,
    changingUpdate: state.finance.changingUpdate,
    changingDelete: state.finance.changingDelete,
    page: state.finance.page
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetCountFinance: (formSearch) => dispatch(actions.getCountFinance(formSearch)),
    onDelete: (id, page, formSearch) => dispatch(actions.deleteFinance(id, page, formSearch))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);