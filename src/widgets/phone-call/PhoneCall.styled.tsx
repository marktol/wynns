import { Button, TextField } from "@mui/material";
import styled from "styled-components";

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
export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const CloseIconToEnd = styled.div`
  width: 30px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`;

export const StyledLink = styled.a`
  margin-top: 15px;
  text-decoration: "none";
  color: "inherit";
`;

export const StyledModalIcon = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`;
