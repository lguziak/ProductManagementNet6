import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function prouductCategoryReducer(
  state = initialState.productcategory,
  action
) {
  switch (action.type) {
    case types.LOAD_PRODUCTCATEGORY_SUCCESS:
      return action.productcategory;
    default:
      return state;
  }
}
