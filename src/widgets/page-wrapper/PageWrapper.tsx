"use client";

import { AuthProvider } from "@/contexts/auth.context";
import type { FC, PropsWithChildren, ReactElement } from "react";
import Header from "../header/Header";
import { Content } from "./PageWrapper.styled";
import lightTheme from "@/shared/styles/lightTheme";
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";

const PageWrapper: FC<PropsWithChildren> = ({ children }): ReactElement => (
  <AuthProvider>
    <ThemeProvider theme={lightTheme}>
      <SnackbarProvider maxSnack={3}>
        <Header />
        <Content>{children}</Content>
      </SnackbarProvider>
    </ThemeProvider>
  </AuthProvider>
);

export { PageWrapper };
