import React, {Fragment, useEffect} from "react";
import {
  List
} from './Components';
import * as actions from '../../../../store/actions';
import {connect} from "react-redux";
import {Fab, Grid} from "@material-ui/core";
import {AddCircle} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

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

  const {
    onGetCountAccount
  } = props;
  useEffect(() => {
    onGetCountAccount()
  },[onGetCountAccount])
  return (
    <Fragment>
      <Grid container justify={"space-between"}>
        <Grid item>
          <h3>
            All Finance Account
          </h3>
        </Grid>
        <Grid item>
          <Fab variant="extended" className={classes.btnAdd}>
            <AddCircle className={classes.extendedIcon}/>
            Account
          </Fab>
        </Grid>
      </Grid>
      <List/>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCountAccount: () => dispatch(actions.getCountAccount())
  };
};

export default connect(null, mapDispatchToProps)(Account)