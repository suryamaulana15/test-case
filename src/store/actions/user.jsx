import * as actions from './actionTypes';
import axios from '../../axios-orders';
import { setAlert } from './alert';

export const fetchUsersStart = () => {
  return {
    type: actions.FETCH_USERS_START
  }
}

export const fetchUsersSuccess = (users, currentPage, perPage, totalItems) => {
  return {
    type: actions.FETCH_USERS_SUCCESS,
    user: {
      users,
      currentPage,
      perPage,
      totalItems
    },
  }
}

export const fetchUsersFail = (error) => {
  return {
    type: actions.FETCH_USERS_FAIL,
    error: error
  }
}

export const fetchUsers = (page, token) => {
  return dispatch => {
    dispatch(fetchUsersStart())
    axios.get('v1/admin/users?page=' + page, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const fetchedUsers = []
        for (const key in res.data.items) {
          fetchedUsers.push({
            ...res.data.items[key]
          })
        }
        dispatch(fetchUsersSuccess(fetchedUsers, res.data.currentPage, 10, res.data.totalItems))
      })
      .catch(err => {
        dispatch(fetchUsersFail(err.response.data.message))
        dispatch(setAlert(err.response.data.message, "error"))
      })
  }
}

export const storeUserStart = () => {
  return {
    type: actions.STORE_USER_START,
  }
}

export const storeUserSuccess = () => {
  return {
    type: actions.STORE_USER_SUCCESS
  }
}

export const storeUserFail = (error) => {
  return {
    type: actions.STORE_USER_FAIL,
    error: error
  }
}

export const storeUser = (storeData, token) => {
  return dispatch => {
    dispatch(storeUserStart());
    axios.post('v1/admin/users', storeData,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        dispatch(storeUserSuccess())
        dispatch(setAlert(res.data.message, "success"))
      })
      .catch(err => {
        dispatch(storeUserFail(err.response.data.message))
        dispatch(setAlert(err.response.data.message, "error"))
      })
  }
}

export const updateUserStart = () => {
  return {
    type: actions.UPDATE_USER_START,
  }
}

export const updateUserSuccess = () => {
  return {
    type: actions.UPDATE_USER_SUCCESS
  }
}

export const updateUserFail = (error) => {
  return {
    type: actions.UPDATE_USER_FAIL,
    error: error
  }
}

export const updateUser = (storeData, id,token, page) => {
  return dispatch => {
    dispatch(updateUserStart());
    axios.patch('v1/admin/users/' + id, storeData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        dispatch(updateUserSuccess())
        dispatch(fetchUsers(page, token))
        dispatch(setAlert(res.data.message, "success"))
      })
      .catch(err => {
        dispatch(updateUserFail(err.response.data.message))
        dispatch(setAlert(err.response.data.message, "error"))
      })
  }
}