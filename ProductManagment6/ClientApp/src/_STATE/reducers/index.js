import { combineReducers } from "redux";
import products from "./productReducer";
import productcategory from "./productCategoryReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  products,
  productcategory,
  apiCallsInProgress,
});

export default rootReducer;
