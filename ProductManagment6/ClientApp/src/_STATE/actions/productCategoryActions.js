import * as types from "./actionTypes";
import * as productCategoryApi from "../../api/productCategoryApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadProductCategorySuccess(productcategory) {
  return { type: types.LOAD_PRODUCTCATEGORY_SUCCESS, productcategory };
}

export function loadProductCategory() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return productCategoryApi
      .getProductCategory()
      .then((productcategory) => {
        dispatch(loadProductCategorySuccess(productcategory));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
