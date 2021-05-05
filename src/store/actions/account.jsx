import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { setAlert } from './alert';

export const fetchAccountsStart = () => {
  return {
    type: actionTypes.FETCH_ACCOUNTS_START
  };
};

export const fetchAccountsSuccess = (account, page) => {
  return {
    type: actionTypes.FETCH_ACCOUNTS_SUCCESS,
    account: account,
    page: page
  };
};

export const fetchAccountsFail = (error) => {
  return {
    type: actionTypes.FETCH_ACCOUNTS_FAIL,
    error: error
  };
};

export const fetchAccoutnts = (page, formSearch) => {
  let param = '&sort_field='+formSearch.sort_field+'&sort_type='+formSearch.sort_type+'&'+formSearch.search_type+'='+formSearch.search;
  return dispatch => {
    dispatch(fetchAccountsStart());
    axios.get('api/v1/finance-accounts?page='+page+'&per_page=5'+param, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(response => {
        dispatch(fetchAccountsSuccess(response.data, page))
      })
      .catch(err => {
        dispatch(setAlert("Email atau Password Salah", "error"))
        dispatch(fetchAccountsFail(err.response.data.error.message))
        console.log(err)
      });
  };
};

export const getCountAccountStart = () => {
  return {
    type: actionTypes.GET_COUNT_ACCOUNT_START
  };
};

export const getCountAccountSuccess = (count) => {
  return {
    type: actionTypes.GET_COUNT_ACCOUNT_SUCCESS,
    count: count
  };
};

export const getCountAccountFail = (error) => {
  return {
    type: actionTypes.GET_COUNT_ACCOUNT_FAIL,
    error: error
  };
};

export const getCountAccount = () => {
  return dispatch => {
    dispatch(getCountAccountStart());
    axios.get('api/v1/finance-accounts?sort_field=id&sort_type=-1&page=0&per_page=1000', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(response => {
        dispatch(getCountAccountSuccess(response.data.count))
      })
      .catch(err => {
        dispatch(setAlert("Email atau Password Salah", "error"))
        dispatch(getCountAccountFail(err.response.data.error.message))
        console.log(err)
      });
  }
}

export const storeAccountStart = () => {
  return {
    type: actionTypes.STORE_ACCOUNT_START
  };
};

export const storeAccountSuccess = () => {
  return {
    type: actionTypes.STORE_ACCOUNT_SUCCESS
  };
};

export const storeAccountFail = (error) => {
  return {
    type: actionTypes.STORE_ACCOUNT_FAIL,
    error: error
  };
};

export const storeAccount = (storeData) => {
  return dispatch => {
    dispatch(storeAccountStart());
    axios.post('api/v1/finance-accounts', storeData,{
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(response => {
        dispatch(storeAccountSuccess())
        dispatch(setAlert('success input account', "success"))
      })
      .catch(err => {
        dispatch(storeAccountFail(err.response.data.error.message))
        dispatch(setAlert(err.response.data.error.message, "error"))
        console.log(err)
      });
  }
}