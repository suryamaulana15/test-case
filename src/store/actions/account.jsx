import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { setAlert } from './alert';
import {GET_ALL_ACCOUNT_SUCCESS} from "./actionTypes";

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
        dispatch(fetchAccountsFail(err.response.data.error.message))
        dispatch(setAlert(err.response.data.error.message, "error"))
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

export const getCountAccount = (formSearch) => {
  let param = formSearch.search_type+'='+formSearch.search;
  return dispatch => {
    dispatch(getCountAccountStart());
    axios.get('api/v1/finance-accounts?'+param+'&sort_field=id&sort_type=-1&page=0&per_page=1000', {
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
        dispatch(getCountAccountFail(err.response.data.error.message))
        dispatch(setAlert(err.response.data.error.message, "error"))
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

export const updateAccountStart = () => {
  return {
    type: actionTypes.UPDATE_ACCOUNT_START
  };
};

export const updateAccountSuccess = () => {
  return {
    type: actionTypes.UPDATE_ACCOUNT_SUCCESS
  };
};

export const updateAccountFail = (error) => {
  return {
    type: actionTypes.UPDATE_ACCOUNT_FAIL,
    error: error
  };
};

export const updateAccount = (id, storeData, page, formSearch) => {
  return dispatch => {
    dispatch(updateAccountStart());
    axios.put('api/v1/finance-accounts/'+id, storeData,{
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(response => {
        dispatch(updateAccountSuccess());
        dispatch(fetchAccoutnts(page, formSearch));
        dispatch(setAlert('success update account', "success"));
      })
      .catch(err => {
        dispatch(updateAccountFail(err.response.data.error.message));
        dispatch(setAlert(err.response.data.error.message, "error"));
      });
  }
}

export const deleteAccountStart = () => {
  return {
    type: actionTypes.DELETE_ACCOUNT_START
  };
};

export const deleteAccountSuccess = () => {
  return {
    type: actionTypes.DELETE_ACCOUNT_SUCCESS
  };
};

export const deleteAccountFail = (error) => {
  return {
    type: actionTypes.DELETE_ACCOUNT_FAIL,
    error: error
  };
};

export const deleteAccount = (id, page, formSearch) => {
  return dispatch => {
    dispatch(deleteAccountStart());
    axios.delete('api/v1/finance-accounts/'+id,{
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(response => {
        dispatch(deleteAccountSuccess());
        dispatch(fetchAccoutnts(page, formSearch));
        dispatch(setAlert('success delete account', "success"));
      })
      .catch(err => {
        dispatch(deleteAccountFail(err.response.data.error.message));
        dispatch(setAlert(err.response.data.error.message, "error"));
      });
  }
}

export const getAllAccountStart = () => {
  return {
    type: actionTypes.GET_ALL_ACCOUNT_START
  };
};

export const getAllAccountSuccess = (allAccount) => {
  return {
    type: actionTypes.GET_ALL_ACCOUNT_SUCCESS,
    allAccount: allAccount
  };
};

export const getAllAccountFail = (error) => {
  return {
    type: actionTypes.GET_ALL_ACCOUNT_FAIL,
    error: error
  };
};

export const getAllAccount = () => {
  return dispatch => {
    dispatch(getAllAccountStart());
    axios.get('api/v1/finance-accounts?&sort_field=id&sort_type=-1&page=0&per_page=1000', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(response => {
        dispatch(getAllAccountSuccess(response.data.data));
      })
      .catch(err => {
        dispatch(setAlert(err.response.data.error.message, "error"));
        dispatch(getAllAccountFail(err.response.data.error.message));
      });
  }
}