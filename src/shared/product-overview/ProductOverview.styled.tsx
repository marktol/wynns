import styled from "styled-components";

export const FlexDiv = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const ImageStyled = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
`;

// Additional styles for product name and price
export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.h5`
  margin: 0;
`;

export const ProductPrice = styled.p`
  margin: 0;
  color: #555;
`;
