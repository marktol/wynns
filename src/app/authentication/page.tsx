"use client";

import { Button, TextField } from "@mui/material";

const Page = () => {
  const handleSubmit = (e: any) => {
    //login
    alert(`login`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField id="username" label="Username" focused />
        <TextField id="password" label="Password" type="password" focused />
        <Button type="submit">Login</Button>
      </form>
    </>
  );
};

export default Page;
