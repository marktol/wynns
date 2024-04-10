"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import he from "he";
import { PRODUCTS_MOCK } from "../../../../products";
import ProductToCart from "@/widgets/product-to-cart/ProductToCart";
import { Header, StyledImage, Description } from "./page.styled";
import { Button, Grid } from "@mui/material";
import {
  loadDataFromLocalStorage,
  saveDataToLocalStorage,
} from "@/utils/storage/storage.utils";
import { CART_PRODUCTS } from "@/mocks/constants/ids";
import { CartItem } from "@/shared/types/types";
import BasicModal from "@/widgets/modal/BasicModal";
import { useRouter } from "next/navigation";

const ProductPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);

  const router = useRouter();

  const product = PRODUCTS_MOCK.find((el) => el.id == Number(id));

  if (!product) {
    return <div>No product found</div>;
  }
  const parseDescription = () => {
    return { __html: he.decode(product.description) };
  };

  const handleBuyClick = async () => {
    const data = loadDataFromLocalStorage(CART_PRODUCTS);

    const updatedData = data ? JSON.parse(data) : [];

    const currentEl = updatedData.find((el: CartItem) => el.id === product.id);

    if (currentEl) {
      currentEl.quantity += quantity;
    } else {
      updatedData.push({ id: product.id, quantity });
    }

    saveDataToLocalStorage(CART_PRODUCTS, updatedData);

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGoToCart = () => {
    router.push("/cart");
  };

  return (
    <div>
      <Header>
        <h2>{product.name}</h2>
      </Header>
      <Grid container>
        <Grid item xs={1} sm={3} />
        <StyledImage src={product.image} alt={product.model} />
        <ProductToCart
          quantity={quantity}
          setQuantity={setQuantity}
          price={product.price}
          availability={product.availability}
          handleBuyClick={handleBuyClick}
        />
        <Grid item xs={1} sm={3} />
      </Grid>
      <Grid container>
        <Grid item xs={1} sm={3} />
        <Grid item xs={10} sm={6}>
          <h4>Опис</h4>
          <Description dangerouslySetInnerHTML={parseDescription()} />
        </Grid>
        <Grid item xs={1} sm={3} />
      </Grid>

      <BasicModal open={showModal} onClose={handleCloseModal}>
        <h3>Товар був доданий до кошику</h3>
        <Button onClick={handleCloseModal}>Продовжити покупки</Button>
        <Button onClick={handleGoToCart}>Перейти до кошику</Button>
      </BasicModal>
    </div>
  );
};

export default ProductPage;
