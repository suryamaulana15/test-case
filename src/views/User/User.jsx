import React, {Fragment, useEffect, useState} from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {List,Store,Update} from './components';
import {Modal} from "../../components/UI";
import {connect} from "react-redux";
const useStyles = makeStyles(theme=> ({
  contentPaddingBottom:{
    paddingBottom: theme.spacing(3)
  }
}))

const User = props => {
  const classes = useStyles();
  const {changing,updateChanging,currentPage} = props;

  useEffect(() => {
    closedModalDialog();
  },[changing,updateChanging])

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
      title: 'Tambah User',
      maxWidth: 'sm'
    });
    setForm(<Store />);
  }

  const edit = user => {
    setModalState({
      open: true,
      title: 'Edit User',
      maxWidth: 'sm'
    });
    setForm(<Update user={user} page={currentPage}/>);
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
            User
          </Typography>
        </Grid>
        <Grid item>
          <Button variant={"contained"} color={"primary"} onClick={add}>Tambah User</Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <List edit={(user) => edit(user)}/>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    currentPage: state.user.user.currentPage,
    changing: state.user.changing,
    updateChanging: state.user.updateChanging
  };
};

export default connect(mapStateToProps)(User);