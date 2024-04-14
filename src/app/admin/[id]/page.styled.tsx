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
export const StyledTextField = styled(TextField)`
  // margin-top: 20px;
  // margin-left: 8px;
  // width: 600px;
`;

export const StyledTextArea = styled("textarea")`
  // height: 500px;
  // width: 1000px;
`;
