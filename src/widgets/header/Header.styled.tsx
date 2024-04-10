import { Button, TextField } from "@mui/material";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.img`
  height: 70px;
  width: 200px;
`;

export const StyledContent = styled.div`
  margin: 10px;
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
