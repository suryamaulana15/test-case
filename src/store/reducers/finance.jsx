import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  finance: {},
  page: 0,
  count: 0,
  error: {},
  loading: false,
  changing: 0,
  changingUpdate: 0,
  changingDelete: 0,
}

const fetchFinanceStart = (state, action) => {
  return updateObject(state, { error: {}, loading: true })
}

const fetchFinanceSuccess = (state, action) => {
  return updateObject(state, {
    finance: action.finance,
    page: action.page,
    loading: false
  })
}

const fetchFinanceFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const getCountFinanceStart = (state, action) => {
  return updateObject(state, { error: {}, loading: true })
}

const getCountFinanceSuccess = (state, action) => {
  return updateObject(state, {
    count: action.count,
    loading: false
  })
}

const getCountFinanceFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const storeFinanceStart = (state, action) => {
  return updateObject(state, { error: {}, loading: true })
}

const storeFinanceSuccess = (state, action) => {
  return updateObject(state, {
    changing: state.changing+1,
    loading: false
  })
}

const storeFinanceFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const updateFinanceStart = (state, action) => {
  return updateObject(state, { error: {}, loading: true })
}

const updateFinanceSuccess = (state, action) => {
  return updateObject(state, {
    changingUpdate: state.changingUpdate+1,
    loading: false
  })
}

const updateFinanceFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const deleteFinanceStart = (state, action) => {
  return updateObject(state, { error: {}, loading: true })
}

const deleteFinanceSuccess = (state, action) => {
  return updateObject(state, {
    changingDelete: state.changingDelete+1,
    loading: false
  })
}

const deleteFinanceFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FINANCES_START:
      return fetchFinanceStart(state, action);
    case actionTypes.FETCH_FINANCES_SUCCESS:
      return fetchFinanceSuccess(state, action);
    case actionTypes.FETCH_FINANCES_FAIL:
      return fetchFinanceFail(state, action);
    case actionTypes.GET_COUNT_FINANCE_START:
      return getCountFinanceStart(state, action);
    case actionTypes.GET_COUNT_FINANCE_SUCCESS:
      return getCountFinanceSuccess(state, action);
    case actionTypes.GET_COUNT_FINANCE_FAIL:
      return getCountFinanceFail(state, action);
    case actionTypes.STORE_FINANCE_START:
      return storeFinanceStart(state, action);
    case actionTypes.STORE_FINANCE_SUCCESS:
      return storeFinanceSuccess(state, action);
    case actionTypes.STORE_FINANCE_FAIL:
      return storeFinanceFail(state, action);
    case actionTypes.UPDATE_FINANCE_START:
      return updateFinanceStart(state, action);
    case actionTypes.UPDATE_FINANCE_SUCCESS:
      return updateFinanceSuccess(state, action);
    case actionTypes.UPDATE_FINANCE_FAIL:
      return updateFinanceFail(state, action);
    case actionTypes.DELETE_FINANCE_START:
      return deleteFinanceStart(state, action);
    case actionTypes.DELETE_FINANCE_SUCCESS:
      return deleteFinanceSuccess(state, action);
    case actionTypes.DELETE_FINANCE_FAIL:
      return deleteFinanceFail(state, action);
    default: return state
  }
}

export default reducer