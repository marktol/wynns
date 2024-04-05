import ProductOverview from "@/shared/product-overview/ProductOverview";
import React from "react";
import { StyledDiv } from "./CategoryOverview.styled";

interface CategoryOverviewProps {
  name: string;
  products: number[];
}

const CategoryOverview: React.FC<CategoryOverviewProps> = ({
  name,
  products,
}) => {
  return (
    <StyledDiv>
      <h2>{name}</h2>
      {products.map((el: number) => {
        return <ProductOverview key={el} productId={el} />;
      })}
    </StyledDiv>
  );
};

export default CategoryOverview;
