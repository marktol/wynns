import { styled } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

export const Wrapper = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),

  "& div": {
    display: "flex",
    flex: 1,
  },
}));

export const StyledTextArea = styled(TextareaAutosize)(({ theme }) => ({
  minHeight: 200,
}));

export const FileInput = styled("input")(({ theme }) => ({
  display: "flex",
}));

export const Img = styled("img")(({ theme }) => ({
  height: 90,
}));
