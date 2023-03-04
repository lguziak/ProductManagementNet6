import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadProducts, saveProduct } from "../../_STATE/actions/productActions";
import { loadProductCategory } from "../../_STATE/actions/productCategoryActions";
import PropTypes from "prop-types";
import ProductForm from "./ProductForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ProductManagement({
  products,
  productcategory,
  loadProductCategory,
  loadProducts,
  saveProduct,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const { productNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (productcategory.length === 0) {
      loadProductCategory().catch((error) => {
        alert("Loading product categories failed" + error);
      });
    }

    if (products.length === 0) {
      loadProducts().catch((error) => {
        alert("Loading products failed" + error);
      });
    } else {
      setProduct({ ...props.product });
    }

    if ((productNumber && productcategory.length > 0) || products.length > 0) {
      const selectedProduct = getProductByNumber(products, productNumber);
      setProduct(selectedProduct);
    }
  }, [props.product]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "productCategoryId" ? parseInt(value, 10) : value,
    }));
  }

  function formIsValid() {
    const { listPrice, name, productNumber, standardCost } = product;
    const errors = {};

    if (!listPrice) errors.listPrice = "Price is required";
    if (!name) errors.name = "Name is required.";
    if (!productNumber) errors.productNumber = "product number is required.";
    if (!standardCost) errors.standardCost = "Cost is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveProduct(product)
      .then(() => {
        toast.success("Product has been saved.");
        navigate("/products");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  function getProductByNumber(products, productNumber) {
    return (
      products.find((product) => product.productNumber === productNumber) ||
      newProduct
    );
  }

  return productcategory.length === 0 || products.length === 0 ? (
    <Spinner />
  ) : (
    <ProductForm
      product={product}
      productcategory={productcategory}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ProductManagement.propTypes = {
  product: PropTypes.object.isRequired,
  productcategory: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadProductCategory: PropTypes.func.isRequired,
  saveProduct: PropTypes.func.isRequired,
};

function getCurrentDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  return (today = mm + "/" + dd + "/" + yyyy);
}

function mapStateToProps(state) {
  const product = newProduct;
  return {
    product,
    products: state.products,
    productcategory: state.productcategory,
  };
}

const mapDispatchToProps = {
  loadProducts,
  loadProductCategory,
  saveProduct,
};

const newProduct = {
  productId: 1,
  name: "",
  productNumber: "",
  color: "",
  standardCost: 0,
  listPrice: 0,
  size: "",
  weight: 0,
  productCategoryId: "",
  productModelId: "",
  sellStartDate: getCurrentDate(),
  modifiedDate: getCurrentDate(),
  discontinuedDate: "",
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManagement);
