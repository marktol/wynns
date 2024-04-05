"use client";

import {
  getCollectionAndDocuments,
  signOutUser,
} from "@/utils/firebase/firebase.utils";
import ProtectedRoute from "@/widgets/protected-route/ProtectedRoute";
import { Button } from "@mui/material";

const Page = () => {
  const signOut = async () => {
    await signOutUser();
  };

  const getProd = async () => {
    const prod = await getCollectionAndDocuments("products");
    console.log(JSON.stringify(prod));
  };

  return (
    <ProtectedRoute>
      admin <Button onClick={signOut}>Log out</Button>
      <Button onClick={getProd}>get products</Button>
    </ProtectedRoute>
  );
};

export default Page;
