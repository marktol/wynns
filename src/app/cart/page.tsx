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
  StyledInput,
  StyledButton,
  StyledForm,
} from "./page.styled";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import InputMask from "react-input-mask";

const Page = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const data = loadDataFromLocalStorage(CART_PRODUCTS);
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setCartData(parsedData);
      } catch (error) {
        console.error("Error parsing JSON data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const sum = cartData
      ?.reduce((acc, el) => {
        const product = PRODUCTS_MOCK.find((product) => product.id === el.id);
        return acc + (product ? el.quantity * product.price : 0);
      }, 0)
      .toFixed(0);
    setTotal(Number(sum) || 0);
  }, [cartData]);

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

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = () => {};

  return (
    <Wrapper>
      <YourOrder>Оформлення замовлення</YourOrder>
      <h3>Ваше замовлення</h3>
      {cartData.map((item) => {
        const currEl = PRODUCTS_MOCK.find((el) => el.id === item.id);
        if (currEl)
          return (
            <CartBlock key={item.id}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item md={1} sm={1} xs={1}></Grid>
                <Grid item md={2} sm={3} xs={3}>
                  <ProductImage src={currEl.image} alt={currEl.name} />
                </Grid>

                <Grid item md={2} sm={7} xs={7}>
                  <h5>{currEl.name}</h5>
                  <p>Код: {currEl.model}</p>
                </Grid>
                <Grid item md={1} sm={2} xs={2}></Grid>
                <Grid item md={1} sm={2} xs={2}>
                  <div>
                    <p>Ціна</p>
                  </div>
                  <div>
                    <p>{currEl.price.toFixed(0)} ₴</p>
                  </div>
                </Grid>
                <Grid item md={1} sm={3} xs={3}>
                  <Quantity>
                    <p>Кількість</p>
                    <Buttons>
                      <RemoveIcon onClick={() => handleMinusItem(item.id)} />
                      {item.quantity}
                      <AddIcon onClick={() => handlePlusItem(item.id)} />
                    </Buttons>
                  </Quantity>
                </Grid>
                <Grid item md={1} sm={3} xs={3}>
                  <p>Сума</p>
                  <p>{(item.quantity * currEl.price).toFixed(0)} ₴</p>
                </Grid>
                <Grid item md={1} sm={1} xs={1}>
                  <MyDeleteIcon>
                    <DeleteIcon onClick={() => handleRemove(item.id)} />
                  </MyDeleteIcon>
                </Grid>
              </Grid>
            </CartBlock>
          );
      })}
      <h3>Покупець</h3>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput type="tel" variant="outlined" placeholder="Ім'я" />
        <InputMask
          required
          placeholder="Телефон"
          mask="+38 (999) 999-99-99"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        >
          <StyledInput variant="outlined" />
        </InputMask>
        <StyledInput
          type="email"
          variant="outlined"
          placeholder="Електронна пошта"
        />
        <StyledButton type="submit" variant="outlined">
          Оформити замовлення на {total} ₴
        </StyledButton>
      </StyledForm>
    </Wrapper>
  );
};

export default Page;
