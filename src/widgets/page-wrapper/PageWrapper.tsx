"use client";

import { AuthProvider } from "@/contexts/auth.context";
import type { FC, PropsWithChildren, ReactElement } from "react";
import Header from "../header/Header";

const PageWrapper: FC<PropsWithChildren> = ({ children }): ReactElement => (
  <AuthProvider>
    <Header />
    {children}
  </AuthProvider>
);

export { PageWrapper };
