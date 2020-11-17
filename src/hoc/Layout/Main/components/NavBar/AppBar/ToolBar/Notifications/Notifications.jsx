import { Badge, IconButton } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Notifications as NotificationsIcon } from '@material-ui/icons';
// import { connect } from 'react-redux';
// import * as actions from '../../../../../../../../store/actions';
import { Link } from 'react-router-dom'

const Notifications = props => {
  const {unread_count, onFetchNotification, token, changing, onReadNotification} = props;

  useEffect(() => {
    onFetchNotification(1, token)
  },[unread_count, onFetchNotification, token, changing]);

  return (
    <Link to="/notification" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => onReadNotification(token)}>
      <IconButton aria-label="show 17 new notifications" color="inherit">
        <Badge badgeContent={unread_count} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Link>
  )
}

// const mapStateToProps = state => {
//   return {
//     unread_count: state.notification.unread_count,
//     token: state.auth.token,
//     changing: state.notification.changing,
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//   return {
//     onFetchNotification: (page, token) => dispatch(actions.fetchNotifications(page, token)),
//     onReadNotification: (token) => dispatch(actions.readNotifications(token)),
//   }
// }

export default (Notifications);