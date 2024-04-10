import React, { useState } from "react";
import { Button, Popover } from "@mui/material";
import {
  CloseIconToEnd,
  StyledButton,
  StyledContent,
  StyledInput,
  Wrapper,
} from "./PhoneCall.module";
import BasicModal from "../modal/BasicModal";
import InputMask from "react-input-mask";
import CloseIcon from "@mui/icons-material/Close";

const PhoneCall = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
  return (
    <>
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
            <Wrapper>
              <CloseIconToEnd>
                <div></div>
                <div onClick={handleCloseModal}>
                  <CloseIcon />
                </div>
              </CloseIconToEnd>
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
            </Wrapper>
          </BasicModal>
        </StyledContent>
      </Popover>
    </>
  );
};

export default PhoneCall;
