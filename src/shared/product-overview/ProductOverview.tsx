import React from "react";
import { PRODUCTS_MOCK } from "../../../products";

interface ProductOverviewProps {
  productId: number;
}

const ProductOverview: React.FC<ProductOverviewProps> = ({ productId }) => {
  const product = PRODUCTS_MOCK.find((el) => el.product_id == productId);
  return (
    <div>
      <h4>{product?.name}</h4>
      <p>{product?.price}</p>
    </div>
  );
};

export default ProductOverview;
