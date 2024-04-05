import React from "react";
import { PRODUCTS_MOCK } from "../../../products";
import { FlexDiv, ImageStyled } from "./ProductOverview.styled";
import { useRouter } from "next/navigation";

interface ProductOverviewProps {
  productId: number;
}

const ProductOverview: React.FC<ProductOverviewProps> = ({ productId }) => {
  const product = PRODUCTS_MOCK.find((el) => el.id == productId);
  const router = useRouter();
  if (!product) {
    return <div>No product found</div>;
  }

  const handleClick = () => {
    router.push(`product/${product.id}`);
  };

  return (
    <FlexDiv onClick={handleClick}>
      <ImageStyled src={product.image} alt={product.model} />
      <div>
        <h5>{product.name}</h5>
        <p>{product.price} ₴</p>
      </div>
    </FlexDiv>
  );
};

export default ProductOverview;
