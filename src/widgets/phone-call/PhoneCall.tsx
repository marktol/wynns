import React, { useState } from "react";
import { Button, Popover } from "@mui/material";
import {
  CloseIconToEnd,
  StyledButton,
  StyledContent,
  StyledInput,
  StyledLink,
  StyledModalIcon,
  Wrapper,
} from "./PhoneCall.module";
import BasicModal from "../modal/BasicModal";
import InputMask from "react-input-mask";
import CloseIcon from "@mui/icons-material/Close";
import CallIcon from "@mui/icons-material/Call";

const PhoneCall = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const phoneCallNumber = "+380(97)860-73-17";
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
      <Button
        aria-describedby={id}
        variant="outlined"
        onClick={handleClick}
        color="inherit"
      >
        <CallIcon /> {phoneCallNumber}
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
          <Wrapper>
            <StyledLink href={`tel:${phoneCallNumber}`}>
              {phoneCallNumber}
            </StyledLink>
            <CloseIconToEnd onClick={handleCloseModal}>
              <CloseIcon />
            </CloseIconToEnd>
          </Wrapper>

          <p>Пн-Пт: 9:00-20:00</p>
          <Button onClick={handleCallClick} variant="outlined">
            Замовити зворотній дзвінок
          </Button>
          <BasicModal open={showModal} onClose={handleCloseModal}>
            <div>
              <StyledModalIcon>
                <div></div>
                <div onClick={handleCloseModal}>
                  <CloseIcon />
                </div>
              </StyledModalIcon>
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
            </div>
          </BasicModal>
        </StyledContent>
      </Popover>
    </>
  );
};

export default PhoneCall;
