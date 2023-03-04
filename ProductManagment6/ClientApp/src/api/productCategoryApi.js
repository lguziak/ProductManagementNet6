import { handleResponse, handleError } from "./apiUtils";
//const baseUrl = process.env.API_URL + "/productcategory";

export function getProductCategory() {
  return fetch("productcategory").then(handleResponse).catch(handleError);
}
