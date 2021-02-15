import React, { Fragment, useEffect, useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  AddVariant,
  List, Store
  // ,Update,UserAkses
} from './components';
import { Loading, Modal } from "../../components/UI";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import {Link} from "react-router-dom";
const useStyles = makeStyles(theme => ({
  contentPaddingBottom: {
    paddingBottom: theme.spacing(3)
  },
  nonTransform: {
    textDecoration: 'none'
  }
}))

const Produk = props => {
  const classes = useStyles();
  // const {changing,updateChanging,currentPage} = props;
  // const token = sessionStorage.getItem("access_token");
  //
  // useEffect(() => {
  //   closedModalDialog();
  // },[changing,updateChanging])

  const [modalState, setModalState] = useState({
    open: false,
    title: '',
    maxWidth: 'sm',
  });
  const [form, setForm] = useState('');
  const closedModalDialog = () => {
    setModalState({
      open: false,
      title: '',
      maxWidth: 'sm'
    });
    setForm('');
  }

  const add = user => {
    setModalState({
      open: true,
      title: 'Tambah Produk',
      maxWidth: 'sm'
    });
    setForm(<AddVariant />);
  }

  const edit = user => {
    setModalState({
      open: true,
      title: 'Edit Produk',
      maxWidth: 'sm'
    });
    // setForm(<Update user={user} page={currentPage}/>);
    setForm('');
  }

  const access = user => {
    setModalState({
      open: true,
      title: 'Produk Akses',
      maxWidth: 'sm'
    });
    // setForm(<UserAkses userId={user} page={currentPage}/>)
    setForm('');
  }

  return (
    <Fragment>
      <Modal
        maxWidth={modalState.maxWidth}
        open={modalState.open}
        title={modalState.title}
        onCloseModal={closedModalDialog}
        contentModal={form}
      />
      <Grid container justify="space-between" className={classes.contentPaddingBottom}>
        <Grid item>
          <Typography variant={"h3"}>
            Produk
          </Typography>
        </Grid>
        <Grid item>
          <Link to={'create-produk'}>
            <Button variant={"contained"} color={"primary"}className={classes.nonTransform}>Tambah Produk</Button>
          </Link>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <List />
          {/*<List edit={(user) => edit(user)} access={(user) => access(user)}/>*/}
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    // currentPage: state.user.user.currentPage,
    // changing: state.user.changing,
    // updateChanging: state.user.updateChanging,
    // loading: state.user.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onGetUserAkses : (id, token) => dispatch(actions.getUserAkses(id, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Produk);