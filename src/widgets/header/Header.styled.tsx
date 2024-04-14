import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

export const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const Logo = styled("img")(({ theme }) => ({
  height: "3em",
  cursor: "pointer",
}));

export const StyledContent = styled("div")(({ theme }) => ({
  margin: theme.spacing(1),
}));

export const Search = styled(TextField)(({ theme }) => ({
  "& input": {
    padding: theme.spacing(1, 2),
  },
}));
