"use client";

import { signOutUser } from "@/utils/firebase/firebase.utils";
import ProtectedRoute from "@/widgets/protected-route/ProtectedRoute";
import { Button } from "@mui/material";

const Page = () => {
  const signOut = async () => {
    await signOutUser();
  };

  return (
    <ProtectedRoute>
      admin <Button onClick={signOut}>Log out</Button>
    </ProtectedRoute>
  );
};

export default Page;
