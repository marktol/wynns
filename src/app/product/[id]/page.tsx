"use client";

import { useParams } from "next/navigation";
import React from "react";
import he from "he";
import { PRODUCTS_MOCK } from "../../../../products";

const ProductPage = () => {
  const { id } = useParams();

  const product = PRODUCTS_MOCK.find((el) => el.id == Number(id));

  if (!product) {
    return <div>No product found</div>;
  }
  const parseDescription = () => {
    return { __html: he.decode(product.description) };
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.model} />

      <p>{product.price} ₴</p>
      <div dangerouslySetInnerHTML={parseDescription()} />
    </div>
  );
};

export default ProductPage;
