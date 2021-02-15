import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  product: {
    products: [],
    current_page: 1,
    per_page: 0,
    total: 0,
    from: 0,
  },
  product_variant: [],
  detail_product: {},
  changing: 0,
  updateChanging: 0,
  changingVariant: 0,
  error: {},
  loading: false,
}

const fetchProductsStart = (state, action) => {
  return updateObject(state, { error: {}, loading: true })
}

const fetchProductsSuccess = (state, action) => {
  return updateObject(state, {
    product: action.product,
    loading: false
  })
}

const fetchProductsFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const addVariant = (state, action) => {
  const newArray = [...state.product_variant, action.product_variant]
  return updateObject(state, {
    product_variant: newArray,
    changingVariant: state.changingVariant+1
  })
}

const deleteVariant = (state, action) => {
  const updatedArray = state.product_variant.filter((a, index) => +index !== +action.index)
  return updateObject(state, {
    product_variant: updatedArray
  })
}

const clearVariant = (state, action) => {
  return updateObject(state, {
    product_variant: []
  })
}

const storeProductStart = (state, action) => {
  return updateObject(state, {error: {}, loading: true})
}

const storeProductSuccess = (state, action) => {
  return updateObject(state, {
    changing: state.changing+1,
    loading: false
  })
}

const storeProductFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const deleteProductStart = (state, action) => {
  return updateObject(state, {error: {}, loading: true})
}

const deleteProductSuccess = (state, action) => {
  return updateObject(state, {
    changing: state.changing+1,
    loading: false
  })
}

const deleteProductFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const showProductStart = (state, action) => {
  return updateObject(state, {error: {}, loading: true})
}

const showProductSuccess = (state, action) => {
  return updateObject(state, {
    // changing: state.changing+1,
    detail_product: action.detail_product,
    loading: false
  })
}

const showProductFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const deleteVariantStart = (state, action) => {
  return updateObject(state, {error: {}, loading: true})
}

const deleteVariantSuccess = (state, action) => {
  return updateObject(state, {
    changing: state.changing+1,
    loading: false
  })
}

const deleteVariantFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const storeVariantStart = (state, action) => {
  return updateObject(state, {error: {}, loading: true})
}

const storeVariantSuccess = (state, action) => {
  return updateObject(state, {
    changing: state.changing+1,
    loading: false
  })
}

const storeVariantFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const updateVariantStart = (state, action) => {
  return updateObject(state, {error: {}, loading: true})
}

const updateVariantSuccess = (state, action) => {
  return updateObject(state, {
    changing: state.changing+1,
    loading: false
  })
}

const updateVariantFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const updateProductStart = (state, action) => {
  return updateObject(state, {error: {}, loading: true})
}

const updateProductSuccess = (state, action) => {
  return updateObject(state, {
    changing: state.changing+1,
    loading: false
  })
}

const updateProductFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_START:
      return fetchProductsStart(state, action)
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return fetchProductsSuccess(state, action)
    case actionTypes.FETCH_PRODUCTS_FAIL:
      return fetchProductsFail(state, action)
    case actionTypes.ADD_VARIANT:
      return addVariant(state, action)
    case actionTypes.DELETE_VARIANT:
      return deleteVariant(state, action)
    case actionTypes.CLEAR_VARIANT:
      return clearVariant(state, action)
    case actionTypes.STORE_PRODUCTS_START:
      return storeProductStart(state, action);
    case actionTypes.STORE_PRODUCTS_SUCCESS:
      return storeProductSuccess(state, action);
    case actionTypes.STORE_PRODUCTS_FAIL:
      return storeProductFail(state, action);
    case actionTypes.DELETE_PRODUCTS_START:
      return deleteProductStart(state, action);
    case actionTypes.DELETE_PRODUCTS_SUCCESS:
      return deleteProductSuccess(state, action);
    case actionTypes.DELETE_PRODUCTS_FAIL:
      return deleteProductFail(state, action);
    case actionTypes.SHOW_PRODUCT_START:
      return showProductStart(state, action);
    case actionTypes.SHOW_PRODUCT_SUCCESS:
      return showProductSuccess(state, action);
    case actionTypes.SHOW_PRODUCT_FAIL:
      return showProductFail(state, action);
    case actionTypes.DELETE_VARIANT_START:
      return deleteVariantStart(state, action);
    case actionTypes.DELETE_VARIANT_SUCCESS:
      return deleteVariantSuccess(state, action);
    case actionTypes.DELETE_PRODUCTS_FAIL:
      return deleteVariantFail(state, action);
    case actionTypes.STORE_VARIANT_START:
      return storeVariantStart(state, action);
    case actionTypes.STORE_VARIANT_SUCCESS:
      return storeVariantSuccess(state, action);
    case actionTypes.STORE_VARIANT_FAIL:
      return storeVariantFail(state, action);
    case actionTypes.UPDATE_VARIANT_START:
      return updateVariantStart(state, action);
    case actionTypes.UPDATE_VARIANT_SUCCESS:
      return updateVariantSuccess(state, action);
    case actionTypes.UPDATE_VARIANT_FAIL:
      return updateVariantFail(state, action);
    case actionTypes.UPDATE_PRODUCT_START:
      return updateProductStart(state, action);
    case actionTypes.UPDATE_PRODUCT_SUCCESS:
      return updateProductSuccess(state, action);
    case actionTypes.UPDATE_PRODUCT_FAIL:
      return updateProductFail(state, action);
    default: return state
  }
}

export default reducer