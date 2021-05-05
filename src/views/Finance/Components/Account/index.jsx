import React, {Fragment, useEffect, useState} from "react";
import {
  List,Create, Update
} from './Components';
import * as actions from '../../../../store/actions';
import {connect} from "react-redux";
import {Fab, Grid} from "@material-ui/core";
import {AddCircle} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {Modal} from '../../../../components/UI';

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
  }
}));

const Account = props => {

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

  const add = () => {
    setModalState({
      open: true,
      title: 'Create New Account',
      maxWidth: 'sm'
    });
    setForm(<Create/>);
  }

  const {
    onGetCountAccount,changing
  } = props;

  useEffect(() => {
    onGetCountAccount();
    closedModalDialog();
  },[onGetCountAccount, changing]);

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
            All Finance Account
          </h3>
        </Grid>
        <Grid item>
          <Fab variant="extended" className={classes.btnAdd} onClick={add}>
            <AddCircle className={classes.extendedIcon}/>
            Account
          </Fab>
        </Grid>
      </Grid>
      <List/>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    changing: state.account.changing
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetCountAccount: () => dispatch(actions.getCountAccount())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account)