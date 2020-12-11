import * as actions from './actionTypes';
import axios from '../../axios-orders';
import { setAlert } from './alert';

export const fetchUsersStart = () => {
  return {
    type: actions.FETCH_USERS_START
  }
}

export const fetchUsersSuccess = (users, currentPage, perPage, totalItems, from) => {
  return {
    type: actions.FETCH_USERS_SUCCESS,
    user: {
      users,
      currentPage,
      perPage,
      totalItems,
      from
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
        dispatch(fetchUsersSuccess(fetchedUsers, res.data.currentPage, res.data.perPage, res.data.totalItems, res.data.from))
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
        dispatch(storeUserFail(err.response.data.errors))
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
        dispatch(updateUserFail(err.response.data.errors))
        dispatch(setAlert(err.response.data.message, "error"))
      })
  }
}

export const getUserAksesStart = () => {
  return {
    type: actions.GET_USER_AKSES_START
  }
}

export const getUserAksesSuccess = (startUsedDate, endUsedDate, expiredable) => {
  return {
    type: actions.GET_USER_AKSES_SUCCESS,
    userAkses: {
      startUsedDate,
      endUsedDate,
      expiredable
    }
  }
}

export const getUserAksesFail = (error) => {
  return {
    type: actions.GET_USER_AKSES_FAIL,
    error: error
  }
}

export const getUserAkses = (id, token) => {
  return dispatch => {
    dispatch(clearUserAkses())
    dispatch(getUserAksesStart())
    axios.get('v1/admin/user_access/' + id,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        dispatch(getUserAksesSuccess(res.data.startUsedDate, res.data.endUsedDate, res.data.expiredable))
      })
      .catch(err => {
        dispatch(getUserAksesFail(err.response.data.message))
        // dispatch(setAlert(err.response.data.message, "error"))
      })
  }
}

export const clearUserAkses = () => {
  return {
    type: actions.CLEAR_USER_AKSES,
  }
}

export const updateUserAksesStart = () => {
  return {
    type: actions.UPDATE_USER_AKSES_START
  }
}

export const updateUserAksesSuccess = () => {
  return {
    type: actions.UPDATE_USER_AKSES_SUCCESS
  }
}

export const updateUserAksesFail = (error) => {
  return {
    type: actions.UPDATE_USER_AKSES_FAIL,
    error: error
  }
}

export const updateUserAkses = (storeData, id, token,page) => {
  return dispatch => {
    dispatch(updateUserAksesStart());
    axios.patch('v1/admin/user_access/' + id, storeData,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        dispatch(fetchUsers(page, token))
        dispatch(updateUserAksesSuccess())
        dispatch(setAlert(res.data.message, "success"))
      })
      .catch(err => {
        dispatch(updateUserAksesFail(err.response.data.message))
        dispatch(setAlert(err.response.data.message, "error"))
      })
  }
}

export const clearErrorUser = () => {
  return {
    type: actions.CLEAR_ERROR_USER
  }
}