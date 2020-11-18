import * as actions from './actionTypes'
import axios from '../../axios-orders'
import { setAlert } from './alert'

export const fetchProfileStart = () => {
  return {
    type: actions.FETCH_PROFILE_START
  }
}

export const fetchProfileSuccess = (userData) => {
  return {
    type: actions.FETCH_PROFILE_SUCCESS,
    userData: userData,
  }
}

export const fetchProfileFail = (error) => {
  return {
    type: actions.FETCH_PROFILE_FAIL,
    error: error
  }
}

export const fetchProfile = (token) => {
  return dispatch => {
    dispatch(fetchProfileStart())
    axios.get('v1/admin/profile/me', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        sessionStorage.setItem('data', JSON.stringify(response.data))
        dispatch(fetchProfileSuccess(response.data))
        // dispatch(setAlert(response.data.message, "success"))
      })
      .catch(err => {
        dispatch(fetchProfileFail(err.response.data.message))
        dispatch(setAlert(err.response.data.message, "error"))
      })
  }
}

export const updateProfileStart = () => {
  return {
    type: actions.UPDATE_PROFILE_START
  }
}

export const updateProfileSuccess = (userData) => {
  return {
    type: actions.UPDATE_PROFILE_SUCCESS,
    userData: userData,
  }
}

export const updateProfileFail = (error) => {
  return {
    type: actions.UPDATE_PROFILE_FAIL,
    error: error
  }
}

export const updateProfile = (storeData, token) => {
  return dispatch => {
    dispatch(updateProfileStart())
    axios.patch('v1/admin/profile/me', storeData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        sessionStorage.setItem('data', JSON.stringify(response.data.user))
        dispatch(updateProfileSuccess(response.data.user))
        dispatch(setAlert(response.data.message, "success"))
      })
      .catch(err => {
        dispatch(updateProfileFail(err.response.data.message))
        dispatch(setAlert(err.response.data.message, "error"))
      })
  }
}

export const changePasswordStart = () => {
  return {
    type: actions.CHANGE_PASSWORD_START
  }
}

export const changePasswordSuccess = () => {
  return {
    type: actions.CHANGE_PASSWORD_SUCCESS,
  }
}

export const changePasswordFail = (error) => {
  return {
    type: actions.CHANGE_PASSWORD_FAIL,
    error: error
  }
}

export const changePassword = (storeData, token) => {
  return dispatch => {
    dispatch(changePasswordStart())
    axios.patch('v1/user/profile/password', storeData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        dispatch(changePasswordSuccess())
        dispatch(setAlert(response.data.message, "success"))
      })
      .catch(err => {
        dispatch(changePasswordFail(err.response.data.message))
        dispatch(setAlert(err.response.data.message, "error"))
      })
  }
}