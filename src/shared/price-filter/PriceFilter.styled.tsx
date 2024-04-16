import { Slider, TextField } from "@mui/material";
import styled from "styled-components";

export const StyledInputs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
`;

export const StyledTextField = styled(TextField)`
  width: 100px;
`;

export const StyledSlider = styled(Slider)`
  width: 250px;
`;
