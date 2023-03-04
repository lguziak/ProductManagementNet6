import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import moment from "moment";
import DateInput from "../common/DateInput";

const ProductForm = ({
  product,
  productcategory,
  onChange,
  onSave,
  saving = false,

  errors = {},
}) => {
  function formatDate(date) {
    if (!!date) {
      const newdate = date.split("T")[0];
      const now = new Date(newdate);
      var dateString = moment(now).add(1, "days").format("YYYY-MM-DD");
      return dateString;
    }
  }

  return (
    <form onSubmit={onSave}>
      <h2>{product.productId ? "Edit" : "Add"} Product</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}

      <div className="container">
        <div className="row">
          <div className="col">
            <TextInput
              name="name"
              label="Product Name"
              value={product.name}
              onChange={onChange}
              error={errors.name}
            />
          </div>
          <div className="col">
            <TextInput
              name="color"
              label="Product Color"
              value={product.color}
              onChange={onChange}
              error={errors.colors}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <TextInput
              name="productNumber"
              label="Product Number"
              value={product.productNumber}
              onChange={onChange}
              error={errors.productNumber}
            />
          </div>
          <div className="col">
            <TextInput
              name="size"
              label="Size"
              value={product.size}
              onChange={onChange}
              error={errors.size}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <SelectInput
              name="productCategoryId"
              label="Product Category"
              value={product.productCategoryId || ""}
              defaultOption="Select Product Category"
              options={productcategory.map((category) => ({
                value: category.productCategoryId,
                text: category.name,
              }))}
              onChange={onChange}
              error={errors.ProductCategoryId}
            />
          </div>
          <div className="col">
            <TextInput
              name="listPrice"
              label="List Price"
              value={product.listPrice + ""}
              onChange={onChange}
              error={errors.listPrice}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <TextInput
              name="standardCost"
              label="Standard Cost"
              value={product.standardCost + ""}
              onChange={onChange}
              error={errors.standardCost}
            />
          </div>
          <div className="col">
            <TextInput
              name="weight"
              label="Weight"
              value={product.weight + ""}
              onChange={onChange}
              error={errors.weight}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <DateInput
              name="sellStartDate"
              label="Sell Start Date"
              value={formatDate(product.sellStartDate)}
              onChange={onChange}
              error={errors.sellstartdate}
            />
          </div>
          <div className="col">
            <DateInput
              name="modifiedDate"
              label="Modified Date"
              value={formatDate(product.modifiedDate)}
              onChange={onChange}
              error={errors.modifieddate}
            />
          </div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>
      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};
ProductForm.propTypes = {
  product: PropTypes.object.isRequired,
  productcategory: PropTypes.array.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default ProductForm;
