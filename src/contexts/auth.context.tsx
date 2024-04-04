import { onAuthStateChangedListener } from "@/utils/firebase/firebase.utils";
import { User } from "firebase/auth";
import { Context, ReactNode, createContext, useEffect, useState } from "react";

interface Props {
  children: ReactNode | string | JSX.Element | JSX.Element[];
}

interface AuthContextObject {
  currentUser: User | null;
}

const initContextObject: AuthContextObject = {
  currentUser: null,
};

const localStorageKey = "currentUser";
const persistedUserString = localStorage.getItem(localStorageKey);

export const AuthContext: Context<AuthContextObject> =
  createContext(initContextObject);

export const AuthProvider = ({ children }: Props) => {
  const persistedUser = persistedUserString
    ? JSON.parse(persistedUserString)
    : null;
  const [currentUser, setCurrentUser] = useState<User | null>(persistedUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user);
      localStorage.setItem(localStorageKey, JSON.stringify(user));
    });

    return unsubscribe;
  }, []);

  const value = { currentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
