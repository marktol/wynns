"use client";

import { signInAuthUserWithEmailAndPassword } from "@/utils/firebase/firebase.utils";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

interface LoginForm {
  email: string;
  password: string;
}

const defaultForm: LoginForm = {
  email: "",
  password: "",
};

const Page = () => {
  const [form, setForm] = useState(defaultForm);
  const router = useRouter();

  const { email, password } = form;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      if (response) {
        router.push("/admin");
        alert("logged in");
      }
    } catch (e: any) {
      alert("error");
      console.log(e);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="Email"
          type="email"
          name="email"
          required
          focused
          value={email}
          onChange={handleChange}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          name="password"
          required
          focused
          value={password}
          onChange={handleChange}
        />
        <Button type="submit">Login</Button>
      </form>
    </>
  );
};

export default Page;
