import React, {Fragment, useEffect, useState} from "react";
import {CardContent, Grid, Typography, Card, Avatar, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import {Modal, Loading} from '../../components/UI';
import {UpdateProfile} from './components';
import {UpdatePassword} from './components';
import * as actions from '../../store/actions';
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
  contentPaddingBottom: {
    paddingBottom: 20,
  },
  avatarSize: {
    width: '80%',
    height: 'auto',
    margin: 'auto'
  },
  contentCenter: {
    textAlign: "center",
  }
}));

const Profile = props => {
  const classes = useStyles();
  const { loading, userData, onFetchUserData,changing } = props;

  const token = sessionStorage.getItem("access_token");
  useEffect(() => {
    onFetchUserData(token)
  },[onFetchUserData, token]);
  useEffect(() => {
    closedModalDialog();
  },[changing]);

  const [modalState, setModalState] = useState({
    open: false,
    title: '',
    maxWidth: 'sm',
  });

  const [form, setForm] = useState('');

  const ubahProfile = () => {
    setModalState({
      open: true,
      title: 'Ubah Profile',
      maxWidth: 'sm'
    });
    setForm(<UpdateProfile userData={userData} closedModalDialog={() => closedModalDialog()} />)
  }

  const ubahPassword = () => {
    setModalState({
      open: true,
      title: 'Ubah Password',
      maxWidth: 'sm'
    });
    setForm(<UpdatePassword closedModalDialog={() => closedModalDialog()} />)
  }

  const closedModalDialog = () => {
    setModalState({
      open: false,
      title: '',
      maxWidth: 'sm'
    });
    setForm('');
  }


  return (loading? <Loading/>
    :<Fragment>
      <Modal
        maxWidth={modalState.maxWidth}
        open={modalState.open}
        title={modalState.title}
        onCloseModal={closedModalDialog}
        contentModal={form}
      />

      <Grid container justify="space-between" className={classes.contentPaddingBottom}>
        <Grid item>
          <Typography variant="h3">Profile</Typography>
        </Grid>
      </Grid>
      <Grid container justify="space-around">
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Card>
            <CardContent>
              <div className={classes.contentPaddingBottom}>
                <Avatar
                  alt="Person"
                  src=""
                  className={classes.avatarSize}
                />
              </div>
              <hr/>
              <div className={clsx(classes.contentPaddingBottom, classes.contentCenter)}>
                <Typography variant="h4" component="h2">
                  {userData.name}
                </Typography>
                <Typography variant="h5">
                  {userData.roleId}
                </Typography>
              </div>
              <div>
                <Button variant={"contained"} color={"primary"} size={"medium"} fullWidth onClick={ubahProfile}>Update Profile</Button>
                <Button variant={"contained"} color={"secondary"} size={"medium"} fullWidth onClick={ubahPassword}>Ubah Password</Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    changing: state.profile.changing,
    loading: state.profile.loading,
    userData: state.profile.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUserData: (token) => dispatch(actions.fetchProfile(token))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
