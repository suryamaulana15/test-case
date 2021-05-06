import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  account: {},
  page: 0,
  count: 0,
  error: {},
  loading: false,
  changing: 0,
  changingUpdate: 0,
  changingDelete: 0,
}

const fetchAccountStart = (state, action) => {
  return updateObject(state, { error: {}, loading: true })
}

const fetchAccountSuccess = (state, action) => {
  return updateObject(state, {
    account: action.account,
    page: action.page,
    loading: false
  })
}

const fetchAccountFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const getCountAccountStart = (state, action) => {
  return updateObject(state, { error: {}, loading: true })
}

const getCountAccountSuccess = (state, action) => {
  return updateObject(state, {
    count: action.count,
    loading: false
  })
}

const getCountAccountFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const storeAccountStart = (state, action) => {
  return updateObject(state, { error: {}, loading: true })
}

const storeAccountSuccess = (state, action) => {
  return updateObject(state, {
    changing: state.changing+1,
    loading: false
  })
}

const storeAccountFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const updateAccountStart = (state, action) => {
  return updateObject(state, { error: {}, loading: true })
}

const updateAccountSuccess = (state, action) => {
  return updateObject(state, {
    changingUpdate: state.changingUpdate+1,
    loading: false
  })
}

const updateAccountFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const deleteAccountStart = (state, action) => {
  return updateObject(state, { error: {}, loading: true })
}

const deleteAccountSuccess = (state, action) => {
  return updateObject(state, {
    changingDelete: state.changingDelete+1,
    loading: false
  })
}

const deleteAccountFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ACCOUNTS_START:
      return fetchAccountStart(state, action);
    case actionTypes.FETCH_ACCOUNTS_SUCCESS:
      return fetchAccountSuccess(state, action);
    case actionTypes.FETCH_ACCOUNTS_FAIL:
      return fetchAccountFail(state, action);
    case actionTypes.GET_COUNT_ACCOUNT_START:
      return getCountAccountStart(state, action);
    case actionTypes.GET_COUNT_ACCOUNT_SUCCESS:
      return getCountAccountSuccess(state, action);
    case actionTypes.GET_COUNT_ACCOUNT_FAIL:
      return getCountAccountFail(state, action);
    case actionTypes.STORE_ACCOUNT_START:
      return storeAccountStart(state, action);
    case actionTypes.STORE_ACCOUNT_SUCCESS:
      return storeAccountSuccess(state, action);
    case actionTypes.STORE_ACCOUNT_FAIL:
      return storeAccountFail(state, action);
    case actionTypes.UPDATE_ACCOUNT_START:
      return updateAccountStart(state, action);
    case actionTypes.UPDATE_ACCOUNT_SUCCESS:
      return updateAccountSuccess(state, action);
    case actionTypes.UPDATE_ACCOUNT_FAIL:
      return updateAccountFail(state, action);
    case actionTypes.DELETE_ACCOUNT_START:
      return deleteAccountStart(state, action);
    case actionTypes.DELETE_ACCOUNT_SUCCESS:
      return deleteAccountSuccess(state, action);
    case actionTypes.DELETE_ACCOUNT_FAIL:
      return deleteAccountFail(state, action);
    default: return state
  }
}

export default reducer