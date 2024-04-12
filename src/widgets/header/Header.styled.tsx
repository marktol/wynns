import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

export const Wrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const Logo = styled("img")`
  height: 47px;
`;

export const StyledContent = styled("div")`
  margin: 10px;
`;

export const Search = styled(TextField)(({ theme }) => ({
  "& input": {
    padding: theme.spacing(1, 2),
  },
}));
