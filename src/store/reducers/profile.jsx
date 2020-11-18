import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  userData: {},
  changing: 0,
  error: {},
  loading: false,
}

const fetchProfileStart = (state, action) => {
  return updateObject(state, { error: null, loading: true })
}

const fetchProfileSuccess = (state, action) => {
  return updateObject(state, {
    userData: action.userData,
    loading: false
  })
}

const fetchProfileFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const updateProfileStart = (state, action) => {
  return updateObject(state, { error: null, loading: true })
}

const updateProfileSuccess = (state, action) => {
  return updateObject(state, {
    userData: action.userData,
    changing: state.changing+1,
    loading: false
  })
}

const updateProfileFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const changePasswordStart = (state, action) => {
  return updateObject(state, { error: null, loading: true })
}

const changePasswordSuccess = (state, action) => {
  return updateObject(state, {
    changing: state.changing+1,
    loading: false
  })
}

const changePasswordFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PROFILE_START: return updateProfileStart(state, action)
    case actionTypes.UPDATE_PROFILE_SUCCESS: return updateProfileSuccess(state, action)
    case actionTypes.UPDATE_PROFILE_FAIL: return updateProfileFail(state, action)
    case actionTypes.FETCH_PROFILE_START: return fetchProfileStart(state, action)
    case actionTypes.FETCH_PROFILE_SUCCESS: return fetchProfileSuccess(state, action)
    case actionTypes.FETCH_PROFILE_FAIL: return fetchProfileFail(state, action)
    case actionTypes.CHANGE_PASSWORD_START: return changePasswordStart(state, action)
    case actionTypes.CHANGE_PASSWORD_SUCCESS: return changePasswordSuccess(state, action)
    case actionTypes.CHANGE_PASSWORD_FAIL: return changePasswordFail(state, action)

    default: return state
  }
}

export default reducer
