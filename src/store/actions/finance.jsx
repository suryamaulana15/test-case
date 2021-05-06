import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { setAlert } from './alert';

export const fetchFinancesStart = () => {
  return {
    type: actionTypes.FETCH_FINANCES_START
  };
};

export const fetchFinancesSuccess = (finance, page) => {
  return {
    type: actionTypes.FETCH_FINANCES_SUCCESS,
    finance: finance,
    page: page
  };
};

export const fetchFinancesFail = (error) => {
  return {
    type: actionTypes.FETCH_FINANCES_FAIL,
    error: error
  };
};

export const fetchFinances = (page, formSearch) => {
  let param = '&sort_field='+formSearch.sort_field+'&sort_type='+formSearch.sort_type+'&'+formSearch.search_type+'='+formSearch.search;
  return dispatch => {
    dispatch(fetchFinancesStart());
    axios.get('api/v1/finances?page='+page+'&per_page=5'+param, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(response => {
        dispatch(fetchFinancesSuccess(response.data, page))
      })
      .catch(err => {
        dispatch(fetchFinancesFail(err.response.data.error.message));
        dispatch(setAlert(err.response.data.error.message, "error"));
      });
  };
};

export const getCountFinanceStart = () => {
  return {
    type: actionTypes.GET_COUNT_FINANCE_START
  };
};

export const getCountFinanceSuccess = (count) => {
  return {
    type: actionTypes.GET_COUNT_FINANCE_SUCCESS,
    count: count
  };
};

export const getCountFinanceFail = (error) => {
  return {
    type: actionTypes.GET_COUNT_FINANCE_FAIL,
    error: error
  };
};

export const getCountFinance = (formSearch) => {
  let param = formSearch.search_type+'='+formSearch.search;
  return dispatch => {
    dispatch(getCountFinanceStart());
    axios.get('api/v1/finances?'+param+'&sort_field=id&sort_type=-1&page=0&per_page=1000', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(response => {
        dispatch(getCountFinanceSuccess(response.data.count))
      })
      .catch(err => {
        dispatch(getCountFinanceFail(err.response.data.error.message))
        dispatch(setAlert(err.response.data.error.message, "error"))
        console.log(err)
      });
  }
}

export const storeFinanceStart = () => {
  return {
    type: actionTypes.STORE_FINANCE_START
  };
};

export const storeFinanceSuccess = () => {
  return {
    type: actionTypes.STORE_FINANCE_SUCCESS
  };
};

export const storeFinanceFail = (error) => {
  return {
    type: actionTypes.STORE_FINANCE_FAIL,
    error: error
  };
};

export const storeFinance = (storeData) => {
  return dispatch => {
    dispatch(storeFinanceStart());
    axios.post('api/v1/finances', storeData,{
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(response => {
        dispatch(storeFinanceSuccess())
        dispatch(setAlert('success input finance transaction', "success"))
      })
      .catch(err => {
        dispatch(storeFinanceFail(err.response.data.error.message))
        dispatch(setAlert(err.response.data.error.message, "error"))
        console.log(err)
      });
  }
}

export const updateFinanceStart = () => {
  return {
    type: actionTypes.UPDATE_FINANCE_START
  };
};

export const updateFinanceSuccess = () => {
  return {
    type: actionTypes.UPDATE_FINANCE_SUCCESS
  };
};

export const updateFinanceFail = (error) => {
  return {
    type: actionTypes.UPDATE_FINANCE_FAIL,
    error: error
  };
};

export const updateFinance = (id, storeData, page, formSearch) => {
  return dispatch => {
    dispatch(updateFinanceStart());
    axios.put('api/v1/finances/'+id, storeData,{
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(response => {
        dispatch(updateFinanceSuccess());
        dispatch(fetchFinances(page, formSearch));
        dispatch(setAlert('success update finance transaction', "success"));
      })
      .catch(err => {
        dispatch(updateFinanceFail(err.response.data.error.message));
        dispatch(setAlert(err.response.data.error.message, "error"));
      });
  }
}

export const deleteFinanceStart = () => {
  return {
    type: actionTypes.DELETE_FINANCE_START
  };
};

export const deleteFinanceSuccess = () => {
  return {
    type: actionTypes.DELETE_FINANCE_SUCCESS
  };
};

export const deleteFinanceFail = (error) => {
  return {
    type: actionTypes.DELETE_FINANCE_FAIL,
    error: error
  };
};

export const deleteFinance = (id, page, formSearch) => {
  return dispatch => {
    dispatch(deleteFinanceStart());
    axios.delete('api/v1/finances/'+id,{
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(response => {
        dispatch(deleteFinanceSuccess());
        dispatch(fetchFinances(page, formSearch));
        dispatch(setAlert('success delete finance transaction', "success"));
      })
      .catch(err => {
        dispatch(deleteFinanceFail(err.response.data.error.message));
        dispatch(setAlert(err.response.data.error.message, "error"));
      });
  }
}