import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  user: {
    users: [],
    currentPage: 1,
    perPage: 0,
    totalItems: 0
  },
  changing: 0,
  updateChanging: 0,
  error: {},
  loading: false,
}

const fetchUsersStart = (state, action) => {
  return updateObject(state, { error: {}, loading: true })
}

const fetchUsersSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user,
    loading: false
  })
}

const fetchUsersFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const storeUserStart = (state, action) => {
  return updateObject(state, {error: {}, loading: true})
}

const storeUserSuccess = (state, action) => {
  return updateObject(state, {
    changing: state.changing+1,
    loading: false
  })
}

const storeUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const updateUserStart = (state, action) => {
  return updateObject(state, {error: {}, loading: true})
}

const updateUserSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    updateChanging: state.updateChanging+1
  })
}

const updateUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_START: return fetchUsersStart(state, action)
    case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess(state, action)
    case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail(state, action)
    case actionTypes.STORE_USER_START: return storeUserStart(state, action)
    case actionTypes.STORE_USER_SUCCESS: return storeUserSuccess(state, action)
    case actionTypes.STORE_USER_FAIL: return storeUserFail(state, action)
    case actionTypes.UPDATE_USER_START: return updateUserStart(state, action)
    case actionTypes.UPDATE_USER_SUCCESS: return updateUserSuccess(state, action)
    case actionTypes.UPDATE_USER_FAIL: return updateUserFail(state, action)

    default: return state
  }
}

export default reducer
