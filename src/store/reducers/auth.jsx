import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  token: null,
  last_login: null,
  name: null,
  error: {},
  loading: false,
}

const signInStart = (state, action) => {
  return updateObject(state, { error: {}, loading: true })
}

const signInSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    last_login: action.last_login,
    name: action.name,
    loading: false
  })
}

const signInFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const signOut = (state, action) => {
  return updateObject(state, {
    token: '',
    last_login: '',
    name: ''
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN_START:
      return signInStart(state, action)
    case actionTypes.SIGNIN_SUCCESS:
      return signInSuccess(state, action)
    case actionTypes.SIGNIN_FAIL:
      return signInFail(state, action)
    case actionTypes.SIGNOUT:
      return signOut(state, action)
    default: return state
  }
}

export default reducer