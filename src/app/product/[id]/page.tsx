"use client";

import { useParams } from "next/navigation";
import React from "react";
import he from "he";
import { PRODUCTS_MOCK } from "../../../../products";
import ProductToCart from "@/widgets/product-to-cart/ProductToCart";
import { Header, StyledImage, Wrapper, Description } from "./page.styled";
import { Grid } from "@mui/material";

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
      <Header>
        <h2>{product.name}</h2>
      </Header>
      <Wrapper>
        <StyledImage src={product.image} alt={product.model} />
        <ProductToCart
          price={product.price}
          availability={product.availability}
        />
      </Wrapper>
      <Grid container>
        <Grid item xs={0} sm={3} />
        <Grid item xs={12} sm={6}>
          <h4>Опис</h4>
          <Description dangerouslySetInnerHTML={parseDescription()} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductPage;
