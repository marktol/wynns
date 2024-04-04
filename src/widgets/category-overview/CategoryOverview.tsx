import ProductOverview from "@/shared/product-overview/ProductOverview";
import React from "react";

interface CategoryOverviewProps {
  name: string;
  products: number[];
}

const CategoryOverview: React.FC<CategoryOverviewProps> = ({
  name,
  products,
}) => {
  return (
    <div>
      <h2>{name}</h2>
      {products.map((el: number) => {
        return <ProductOverview productId={el} />;
      })}
    </div>
  );
};

export default CategoryOverview;
