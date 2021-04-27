import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { setAlert } from './alert';

export const signInStart = () => {
  return {
    type: actionTypes.SIGNIN_START
  };
};

export const signInSuccess = (name, last_login, token) => {
  return {
    type: actionTypes.SIGNIN_SUCCESS,
    name: name,
    last_login: last_login,
    token: token
  };
};

export const signInFail = (error) => {
  return {
    type: actionTypes.SIGNIN_FAIL,
    error: error
  };
};

export const signIn = (storeData, history) => {
  return dispatch => {
    dispatch(signInStart())
    axios.post('api/v1/login', storeData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    })
      .then(response => {
        sessionStorage.setItem('username', storeData.username)
        sessionStorage.setItem('name', response.data.name)
        sessionStorage.setItem('last_login', response.data.last_login)
        sessionStorage.setItem('token', response.data.token)
        history.push(`/dashboard`)
        dispatch(signInSuccess(response.data.name, response.data.last_login, response.data.token))
      })
      .catch(err => {
        dispatch(setAlert("Email atau Password Salah", "error"))
        console.log(err)
      })
  }
}

export const signOut= () => {
  return {
    type: actionTypes.SIGNOUT
  }
}

export const logout = () => {
  return dispatch => {
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('last_login');
    sessionStorage.removeItem('token');
    sessionStorage.clear()
    dispatch(signOut())
  }
}