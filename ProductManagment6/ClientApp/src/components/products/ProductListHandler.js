import React from "react";
import { connect } from "react-redux";
import * as productActions from "../../_STATE/actions/productActions";
import * as productCategoryActions from "../../_STATE/actions/productCategoryActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import ProductList from "./ProductListForm";
import { Navigate } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class ProductComponent extends React.Component {
  state = {
    redirectToAddProductPage: false,
  };

  componentDidMount() {
    const { products, productcategory, actions } = this.props;

    if (products.length === 0) {
      actions.loadProducts().catch((error) => {
        alert("Loading products failed" + error);
      });
    }

    if (productcategory.length === 0) {
      actions.loadProductCategory().catch((error) => {
        alert("Loading product category failed" + error);
      });
    }
  }

  handleDeleteProduct = async (product) => {
    toast.success("Product deleted...");
    try {
      await this.props.actions.deleteProduct(product);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddProductPage && <Navigate to="/product" />}
        <h2>Products</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary"
              onClick={() => this.setState({ redirectToAddProductPage: true })}
            >
              Add Product
            </button>

            <ProductList
              onDeleteClick={this.handleDeleteProduct}
              products={this.props.products}
            />
          </>
        )}
      </>
    );
  }
}

ProductComponent.propTypes = {
  productcategory: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    products:
      state.productcategory.length === 0 || state.products.length === 0
        ? []
        : state.products.map((product) => {
            return {
              ...product,
              categoryName: state.productcategory.find(
                (pc) => pc.productCategoryId === product.productCategoryId
              ).name,
            };
          }),
    productcategory: state.productcategory,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProducts: bindActionCreators(productActions.loadProducts, dispatch),
      loadProductCategory: bindActionCreators(
        productCategoryActions.loadProductCategory,
        dispatch
      ),
      deleteProduct: bindActionCreators(productActions.deleteProduct, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent);
