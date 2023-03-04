import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";

const ProductList = ({ products, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>ProductNumber</th>
        <th>Name</th>
        <th>Color</th>
        <th>Category</th>
        <th>StandardCost</th>
        <th>ListPrice</th>
        <th>Size</th>
        <th>Weight</th>
        <th>Sell Start Date</th>
        <th>Modified Date</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product) => {
        return (
          <tr key={product.productId}>
            <td>
              <Link to={`/product/${product.productNumber}`}>
                {product.productNumber}
              </Link>
            </td>
            <td>{product.name}</td>
            <td>{product.color}</td>
            <td>{product.categoryName}</td>
            <td>{product.standardCost}</td>
            <td>{product.listPrice}</td>
            <td>{product.size}</td>
            <td>{product.weight}</td>
            <td>{moment(product.sellStartDate).format("LL")}</td>
            <td>{moment(product.modifiedDate).format("LL")}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(product)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default ProductList;
