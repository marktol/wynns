"use client";

import React, { useEffect, useState } from "react";
import { CART_PRODUCTS } from "@/mocks/constants/ids";
import {
  loadDataFromLocalStorage,
  saveDataToLocalStorage,
} from "@/utils/storage/storage.utils";
import { Button } from "@mui/material";
import { CartItem } from "@/shared/types/types";

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
    saveDataToLocalStorage(CART_PRODUCTS, cartData);
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
    <>
      <div>
        {cartData.map((item, index) => (
          <div key={index}>
            <h1>Ваше замовлення:</h1>
            <p>Ціна</p>
            <p>Кількість</p>
            <p>Сума</p>
            <p>ID: {item.id}</p>
            <Button onClick={() => handleMinusItem(item.id)}>-</Button>
            <p>Quantity: {item.quantity}</p>

            <Button onClick={() => handlePlusItem(item.id)}>+</Button>
            <Button onClick={() => handleRemove(item.id)}>Видалити</Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
