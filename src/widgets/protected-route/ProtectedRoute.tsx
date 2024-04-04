"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth.context";

interface Props {
  children: ReactNode | string | JSX.Element | JSX.Element[];
}

const ProtectedRoute = ({ children }: Props) => {
  const { currentUser: user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  return <>{!user ? <>loading</> : children}</>;
};

export default ProtectedRoute;
