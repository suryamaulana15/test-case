import React, {useEffect} from 'react'
import { Link as RouterLink, NavLink } from 'react-router-dom'
import clsx from 'clsx'
// import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Avatar, Typography } from '@material-ui/core'
import * as actions from "../../../../../../../store/actions";
import {connect} from "react-redux";

const nameColorWhite = '#FFFFFF'
// const nameColorBlack = '#000000';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
    color: nameColorWhite
  }
}))

const Profile = props => {
  const { className, ...rest } = props

  const classes = useStyles()
  // const userData = JSON.parse(sessionStorage.getItem('data'))
  // const token = sessionStorage.getItem("access_token");
  // const {onFetchUserData, userData} = props;
  // useEffect(() => {
  //   onFetchUserData(token);
  // },[])
  const userData = {
    "name": "Surya Maulana",
    "roleId": "Admin"
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <NavLink to="/profile">
        <Avatar
          alt="Person"
          className={classes.avatar}
          component={RouterLink}
          src=""
        />
      </NavLink>
      <Typography
        className={classes.name}
        variant="h4"
      >
        {sessionStorage.name}
      </Typography>
      <Typography variant="body2" style={{ color: nameColorWhite }}>{sessionStorage.username}</Typography>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    // loading: state.profile.loading,
    // userData: state.profile.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onFetchUserData: (token) => dispatch(actions.fetchProfile(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
