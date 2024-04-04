"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth.context";
import { User } from "firebase/auth";

interface Props {
  children: ReactNode | string | JSX.Element | JSX.Element[];
}

const ProtectedRoute = ({ children }: Props) => {
  const [user, setUser] = useState<User | undefined | null>();
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setUser(currentUser);

    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  return <>{!user ? <>loading</> : children}</>;
};

export default ProtectedRoute;
