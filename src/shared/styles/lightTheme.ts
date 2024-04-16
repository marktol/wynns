"use client";

import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Comfortaa } from "next/font/google";

const font = Comfortaa({ subsets: ["cyrillic"] });

const lightTheme = createTheme({
  palette: {
    primary: {
      dark: "#55555d",
      main: "#77777f",
      light: "#dedbda",
      contrastText: "#44444c",
    },
  },
  typography: {
    fontFamily: font.style.fontFamily,
  },
});

export default lightTheme;
