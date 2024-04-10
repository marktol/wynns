"use client";

import { AuthProvider } from "@/contexts/auth.context";
import type { FC, PropsWithChildren, ReactElement } from "react";
import Header from "../header/Header";
import { Content } from "./PageWrapper.module";

const PageWrapper: FC<PropsWithChildren> = ({ children }): ReactElement => (
  <AuthProvider>
    <Header />
    <Content>{children}</Content>
  </AuthProvider>
);

export { PageWrapper };
