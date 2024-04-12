import React, { useState } from "react";
import QuantityInput from "@/shared/quantity-input/QuantityInput";
import { StyledButton, Wrapper } from "./ProductToCart.styled";

interface ProductToCartInterface {
  price: number;
  availability: number;
  quantity: number;
  setQuantity: any;
  handleBuyClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ProductToCart: React.FC<ProductToCartInterface> = ({
  price,
  availability,
  quantity,
  setQuantity,
  handleBuyClick,
}) => {
  const handleQuantityChange = (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.PointerEvent<Element>
      | React.KeyboardEvent<Element>,
    newQuantity: number | null
  ) => {
    if (newQuantity !== null) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Wrapper>
      <div>
        <h3>{price} ₴</h3>
      </div>
      {availability ? (
        <Wrapper>
          <div>
            <p>В наявності</p>
          </div>
          <div>
            <QuantityInput value={quantity} onChange={handleQuantityChange} />
            <StyledButton variant="outlined" onClick={handleBuyClick}>
              КУПИТИ
            </StyledButton>
          </div>
        </Wrapper>
      ) : (
        <p>Немає у наявності</p>
      )}
    </Wrapper>
  );
};

export default ProductToCart;
