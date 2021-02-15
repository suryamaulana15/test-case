import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { setAlert } from './alert';
import {storeUserFail, storeUserStart, storeUserSuccess} from "./user";

export const fetchProductsStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_START
  }
}

export const fetchProductsSuccess = (products, current_page, per_page, total, from) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    product: {
      products,
      current_page,
      per_page,
      total,
      from
    },
  }
}

export const fetchProductsFail = (error) => {
  return {
    type: actionTypes.FETCH_PROFILE_FAIL,
    error: error
  }
}

export const fetchProducts = (page) => {
  return dispatch => {
    dispatch(fetchProductsStart())
    axios.get('produk?page=' + page, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        const fetchedProducts = []
        for (const key in res.data.data) {
          fetchedProducts.push({
            ...res.data.data[key]
          })
        }
        dispatch(fetchProductsSuccess(fetchedProducts, res.data.current_page, res.data.per_page, res.data.total, res.data.from))
      })
      .catch(err => {
        dispatch(fetchProductsFail(err.response.data.message))
        dispatch(setAlert(err.response.data.message, "error"))
      })
  }
}

export const addVariant = (formData) => {
  return{
    type: actionTypes.ADD_VARIANT,
    product_variant: formData
  }
}

export const deleteVariant = (index) => {
  return {
    type: actionTypes.DELETE_VARIANT,
    index: index
  }
}

export const clearVariant = () => {
  return {
    type: actionTypes.CLEAR_VARIANT
  }
}

export const storeProductsStart = () => {
  return {
    type: actionTypes.STORE_PRODUCTS_START
  }
}

export const storeProductSuccess = (products, current_page, per_page, total, from) => {
  return {
    type: actionTypes.STORE_PRODUCTS_SUCCESS
  }
}

export const storeProductFail = (error) => {
  return {
    type: actionTypes.STORE_PRODUCTS_FAIL,
    error: error
  }
}

export const storeProduct = (storeData, history) => {
  return dispatch => {
    dispatch(storeProductsStart());
    axios.post('produk', storeData,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        dispatch(storeProductSuccess())
        dispatch(setAlert(res.data.message, "success"))
        history.push('/produk')
      })
      .catch(err => {
        dispatch(storeProductFail(err.response.data.errors))
        dispatch(setAlert(err.response.data.message, "error"))
      })
  }
}

export const deleteProductsStart = () => {
  return {
    type: actionTypes.DELETE_PRODUCTS_START
  }
}

export const deleteProductSuccess = () => {
  return {
    type: actionTypes.DELETE_PRODUCTS_SUCCESS
  }
}

export const deleteProductFail = (error) => {
  return {
    type: actionTypes.DELETE_PRODUCTS_FAIL,
    error: error
  }
}

export const deleteProduct = (id) => {
  return dispatch => {
    dispatch(deleteProductsStart());
    axios.delete('produk/' +id,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        dispatch(deleteProductSuccess())
        dispatch(setAlert(res.data.message, "success"))
      })
      .catch(err => {
        dispatch(deleteProductFail(err.response.data.errors))
        dispatch(setAlert(err.response.data.message, "error"))
      })
  }
}

export const showProductsStart = () => {
  return {
    type: actionTypes.SHOW_PRODUCT_START
  }
}

export const showProductSuccess = (detail_product) => {
  return {
    type: actionTypes.SHOW_PRODUCT_SUCCESS,
    detail_product: detail_product,
  }
}

export const showProductFail = (error) => {
  return {
    type: actionTypes.SHOW_PRODUCT_FAIL,
    error: error
  }
}

export const showProduct = (id) => {
  return dispatch => {
    dispatch(showProductsStart());
    axios.get('produk/' +id,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        dispatch(showProductSuccess(res.data))
        // dispatch(setAlert(res.data.message, "success"))
      })
      .catch(err => {
        dispatch(showProductFail(err.response.data.errors))
        // dispatch(setAlert(err.response.data.message, "error"))
      })
  }
}

export const deleteVariantStart = () => {
  return {
    type: actionTypes.DELETE_VARIANT_START
  }
}

export const deleteVariantSuccess = () => {
  return {
    type: actionTypes.DELETE_VARIANT_SUCCESS,
  }
}

export const deleteVariantFail = (error) => {
  return {
    type: actionTypes.DELETE_VARIANT_FAIL,
    error: error
  }
}

export const deleteVariantData = (id, id_produk) => {
  return dispatch => {
    dispatch(deleteVariantStart());
    axios.delete('varian/' +id,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        dispatch(deleteVariantSuccess())
        dispatch(showProduct(id_produk))
        dispatch(setAlert(res.data.message, "success"))
      })
      .catch(err => {
        dispatch(deleteVariantFail(err.response.data.errors))
        dispatch(setAlert(err.response.data.message, "error"))
      })
  }
}

export const storeVariantStart = () => {
  return {
    type: actionTypes.STORE_VARIANT_START
  }
}

export const storeVariantSuccess = () => {
  return {
    type: actionTypes.STORE_VARIANT_SUCCESS,
  }
}

export const storeVariantFail = (error) => {
  return {
    type: actionTypes.STORE_VARIANT_FAIL,
    error: error
  }
}

export const storeVariant = (id_produk, storeData) => {
  return dispatch => {
    dispatch(storeVariantStart());
    axios.post('varian/produk/' +id_produk, storeData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        dispatch(storeVariantSuccess())
        dispatch(showProduct(id_produk))
        dispatch(setAlert(res.data.message, "success"))
      })
      .catch(err => {
        dispatch(storeVariantFail(err.response.data.errors))
        dispatch(setAlert(err.response.data.message, "error"))
      })
  }
}

export const updateVariantStart = () => {
  return {
    type: actionTypes.UPDATE_VARIANT_START
  }
}

export const updateVariantSuccess = () => {
  return {
    type: actionTypes.UPDATE_VARIANT_SUCCESS,
  }
}

export const updateVariantFail = (error) => {
  return {
    type: actionTypes.UPDATE_VARIANT_FAIL,
    error: error
  }
}

export const updateVariant = (id, storeData, id_produk) => {
  return dispatch => {
    dispatch(updateVariantStart());
    axios.patch('varian/' +id, storeData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        dispatch(updateVariantSuccess())
        dispatch(showProduct(id_produk))
        dispatch(setAlert(res.data.message, "success"))
      })
      .catch(err => {
        dispatch(updateVariantFail(err.response.data.errors))
        dispatch(setAlert(err.response.data.message, "error"))
      })
  }
}

export const updateProductStart = () => {
  return {
    type: actionTypes.UPDATE_PRODUCT_START
  }
}

export const updateProductSuccess = () => {
  return {
    type: actionTypes.UPDATE_PRODUCT_SUCCESS,
  }
}

export const updateProductFail = (error) => {
  return {
    type: actionTypes.UPDATE_PRODUCT_FAIL,
    error: error
  }
}

export const updateProduct = (id, storeData) => {
  return dispatch => {
    dispatch(updateProductStart());
    axios.patch('produk/' +id, storeData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        dispatch(updateProductSuccess())
        dispatch(showProduct(id))
        dispatch(setAlert(res.data.message, "success"))
      })
      .catch(err => {
        dispatch(updateProductFail(err.response.data.errors))
        dispatch(setAlert(err.response.data.message, "error"))
      })
  }
}