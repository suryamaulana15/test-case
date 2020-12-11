import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  user: {
    users: [],
    currentPage: 1,
    perPage: 0,
    totalItems: 0,
    from: 0,
  },
  userAkses: {},
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

const getUserAksesStart = (state, action) => {
  return updateObject(state, {loading: true})
}

const getUserAksesSuccess = (state, action) => {
  return updateObject(state, {
    userAkses: action.userAkses,
    loading: false,
  })
}

const getUserAksesFail = (state, action) => {
  return updateObject(state, {
    loading: false
  })
}

const clearUserAkses = (state, action) => {
  return updateObject(state, {
    userAkses: {},
  });
};

const updateUserAksesStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const updateUserAksesSuccess = (state, action) => {
  return updateObject(state, {
    updateChanging: state.updateChanging+1,
    loading: false,
  });
};

const updateUserAksesFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const clearErrorUser = (state, action) => {
  return updateObject(state, {
    error: {}
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
    case actionTypes.GET_USER_AKSES_START: return getUserAksesStart(state, action)
    case actionTypes.GET_USER_AKSES_SUCCESS: return getUserAksesSuccess(state, action)
    case actionTypes.GET_USER_AKSES_FAIL: return getUserAksesFail(state, action)
    case actionTypes.CLEAR_USER_AKSES: return clearUserAkses(state, action)
    case actionTypes.UPDATE_USER_AKSES_START: return updateUserAksesStart(state, action)
    case actionTypes.UPDATE_USER_AKSES_SUCCESS: return updateUserAksesSuccess(state, action)
    case actionTypes.UPDATE_USER_AKSES_FAIL: return updateUserAksesFail(state, action)
    case actionTypes.CLEAR_ERROR_USER: return  clearErrorUser(state, action)

    default: return state
  }
}

export default reducer
