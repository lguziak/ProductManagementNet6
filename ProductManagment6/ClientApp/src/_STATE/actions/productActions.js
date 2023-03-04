import * as types from "./actionTypes";
import * as productApi from "../../api/productApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadProductsSuccess(products) {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products };
}

export function createProductSuccess(product) {
  return { type: types.CREATE_PRODUCT_SUCCESS, product };
}

export function updateProductSuccess(product) {
  return { type: types.UPDATE_PRODUCT_SUCCESS, product };
}

export function deleteProductOptimistic(product) {
  return { type: types.DELETE_PRODUCT, product };
}

export function loadProducts() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return productApi
      .getProducts()
      .then((products) => {
        dispatch(loadProductsSuccess(products.value));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveProduct(product) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return productApi
      .saveProduct(product)
      .then((savedProduct) => {
        product.productId
          ? dispatch(updateProductSuccess(savedProduct))
          : dispatch(createProductSuccess(savedProduct));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteProduct(product) {
  return function (dispatch) {
    dispatch(deleteProductOptimistic(product));
    return productApi.deleteProduct(product.productId);
  };
}
