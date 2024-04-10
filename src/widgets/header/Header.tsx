"use client";

import React, { ChangeEvent, useState } from "react";
import { Logo, Wrapper } from "./Header.styled";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PhoneCall from "../phone-call/PhoneCall";
import { Typography } from "@mui/material";
import { Search } from "./Header.styled";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  const [search, setSearch] = useState("");

  const router = useRouter();

  const onChangeSearch = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };

  const navigateToHomePage = () => {
    router.push("/");
  };

  return (
    <Wrapper>
      <Logo onClick={navigateToHomePage} src="/wynns-logo.png" alt="" />
      <Typography variant="h6">Каталог</Typography>
      <Search
        placeholder="Введите товар"
        value={search}
        onChange={onChangeSearch}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />
      <PhoneCall />
      <Link href="/cart">
        <ShoppingCartOutlinedIcon />
      </Link>
    </Wrapper>
  );
};

export default Header;
