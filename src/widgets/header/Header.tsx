"use client";

import { Button, Popover, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import {
  Logo,
  Search,
  StyledButton,
  StyledContent,
  StyledInput,
  Wrapper,
} from "./Header.styled";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BasicModal from "../modal/BasicModal";
import InputMask from "react-input-mask";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const onChangeSearch = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };

  const router = useRouter();

  const navigateToHomePage = () => {
    router.push("/");
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAnchorEl(null);
  };

  const handleCallClick = () => {
    setShowModal(true);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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

      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        +48 452 213 234
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <StyledContent>
          <p>+380(73)157-92-33</p>
          <p>Пн-Пт: 9:00-18:00</p>
          <Button onClick={handleCallClick} variant="outlined">
            Замовити зворотній дзвінок
          </Button>
          <p>Email: </p>
          <BasicModal open={showModal} onClose={handleCloseModal}>
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
            <StyledButton variant="outlined">Відправити</StyledButton>
          </BasicModal>
        </StyledContent>
      </Popover>
      <Link href="/cart">
        <ShoppingCartOutlinedIcon />
      </Link>
    </Wrapper>
  );
};

export default Header;
