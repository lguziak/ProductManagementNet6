import { handleResponse, handleError } from "./apiUtils";
const API_URL_SERVER = "https://localhost:44464/";
const baseUrl = API_URL_SERVER + "products/";

export async function getProducts() {
  return fetch("products").then(handleResponse).catch(handleError);
}

export function saveProduct(product) {
  const httpVerb = product.productId === 1 ? "POST" : "PUT";
  const fetchParam = product.productId !== 1 ? product.productId : "";
  return fetch(baseUrl + fetchParam, {
    method: httpVerb, // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteProduct(id) {
  return fetch(baseUrl + id, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
