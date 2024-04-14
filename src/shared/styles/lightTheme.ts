"use client";

import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Comfortaa } from "next/font/google";

const font = Comfortaa({ subsets: ["cyrillic"] });

const lightTheme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
  },
  typography: {
    fontFamily: font.style.fontFamily,
  },
});

export default lightTheme;
