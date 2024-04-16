import { TextField, styled } from "@mui/material";

export const Wrapper = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),

  "& div": {
    display: "flex",
    flex: 1,
  },
}));

export const StyledInput = styled("div")``;
export const StyledTextField = styled(TextField)``;
export const StyledTextArea = styled("textarea")``;
