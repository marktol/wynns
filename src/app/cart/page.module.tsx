import { Button, TextField } from "@mui/material";
import InputMask from "react-input-mask";
import styled from "styled-components";

export const CartBlock = styled.div`
  display: flex;
  margin-top: 15px;
`;

export const ProductImage = styled.img`
  height: 90px;
  width: 90px;
`;

export const YourOrder = styled.h1`
  text-align: center;
`;

export const Wrapper = styled.div`
  display: block;
`;

export const Buttons = styled.div`
  display: flex;
`;

export const Quantity = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
`;

export const MyDeleteIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`;
export const StyledInput = styled(TextField)`
  margin-left: 20px;
  margin-top: 10px;
  width: 250px;
`;

export const StyledButton = styled(Button)`
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 250px;
`;

export const StyledForm = styled.form`
  display: block;
  flex-direction: center;
  align-items: center;
  justify-content: center;
  margin-top: 20px; /* добавляем отступ сверху для разделения формы от списка заказов */
`;
