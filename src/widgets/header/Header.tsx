"use client";

import { Input } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { Logo, Wrapper } from "./Header.styled";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";

const Header = () => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };

  return (
    <Wrapper>
      <Logo src="/wynns-logo.png" alt="" />
      <div>Каталог</div>
      <Input
        placeholder="Введите товар"
        value={search}
        onChange={onChangeSearch}
      />
      <div>+48 452 213 234</div>
      <Link href="/cart">
        <ShoppingCartOutlinedIcon />
      </Link>
    </Wrapper>
  );
};

export default Header;
