"use client";

import React, { useEffect, useState } from "react";
import { CART_PRODUCTS } from "@/mocks/constants/ids";
import {
  loadDataFromLocalStorage,
  saveDataToLocalStorage,
} from "@/utils/storage/storage.utils";
import { Grid } from "@mui/material";
import { CartItem } from "@/shared/types/types";
import { PRODUCTS_MOCK } from "../../../products";
import {
  Buttons,
  CartBlock,
  ProductImage,
  Quantity,
  Wrapper,
  YourOrder,
  MyDeleteIcon,
} from "./page.module";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Page = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);

  useEffect(() => {
    const data = loadDataFromLocalStorage(CART_PRODUCTS);
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        console.log(parsedData);
        setCartData(parsedData);
      } catch (error) {
        console.error("Error parsing JSON data:", error);
      }
    }
  }, []);

  const handleRemove = (id: number) => {
    const data = cartData.filter((el) => el.id !== id);
    setCartData(data);
    saveDataToLocalStorage(CART_PRODUCTS, data);
  };

  const handlePlusItem = (id: number) => {
    const updatedCartData = cartData.map((el) => {
      if (el.id === id) {
        return { ...el, quantity: el.quantity + 1 };
      }
      return el;
    });
    setCartData(updatedCartData);
    saveDataToLocalStorage(CART_PRODUCTS, updatedCartData);
  };

  const handleMinusItem = (id: number) => {
    const updatedCartData = cartData.map((el) => {
      if (el.id === id && el.quantity > 1) {
        return { ...el, quantity: el.quantity - 1 };
      }
      return el;
    });
    setCartData(updatedCartData);
    saveDataToLocalStorage(CART_PRODUCTS, updatedCartData);
  };

  return (
    <Wrapper>
      <YourOrder>Ваше замовлення:</YourOrder>
      {cartData.map((item) => {
        const currEl = PRODUCTS_MOCK.find((el) => el.id === item.id);
        if (currEl)
          return (
            <CartBlock key={item.id}>
              <Grid container spacing={1}>
                <Grid item sm={2}></Grid>
                <Grid item sm={1}>
                  <ProductImage src={currEl.image} alt={currEl.name} />
                </Grid>
                <Grid item sm={3}>
                  <h5>{currEl.name}</h5>
                </Grid>
                <Grid item sm={1}>
                  <div>
                    <p>Ціна</p>
                  </div>
                  <div>
                    <p>{currEl.price}</p>
                  </div>
                </Grid>
                <Grid item sm={1}>
                  <Quantity>
                    <p>Кількість</p>
                    <Buttons>
                      <RemoveIcon onClick={() => handleMinusItem(item.id)} />
                      {item.quantity}
                      <AddIcon onClick={() => handlePlusItem(item.id)} />
                    </Buttons>
                  </Quantity>
                </Grid>
                <Grid item sm={1}>
                  <p>Сума</p>
                  <p>{(item.quantity * currEl.price).toFixed(0)}</p>
                </Grid>
                <Grid item sm={1}>
                  <MyDeleteIcon>
                    <DeleteIcon onClick={() => handleRemove(item.id)} />
                  </MyDeleteIcon>
                </Grid>
              </Grid>
            </CartBlock>
          );
      })}
    </Wrapper>
  );
};

export default Page;
