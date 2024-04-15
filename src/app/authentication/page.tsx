"use client";

import { signInAuthUserWithEmailAndPassword } from "@/utils/firebase/firebase.utils";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import useNotification from "@/hooks/useNotification";

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
  const { enqueueNotification } = useNotification();

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
        enqueueNotification("Вхід до системи виконано", "success");
      }
    } catch (e: any) {
      enqueueNotification("Помилка входу в систему", "error");

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
        <Box>
          <TextField
            id="email"
            label="Логін"
            type="email"
            name="email"
            required
            focused
            value={email}
            onChange={handleChange}
          />
        </Box>
        <Box marginTop={2}>
          <TextField
            id="password"
            label="Пароль"
            type="password"
            name="password"
            required
            focused
            value={password}
            onChange={handleChange}
          />
        </Box>
        <Box marginTop={1}>
          <Button type="submit">Увійти</Button>
        </Box>
      </form>
    </>
  );
};

export default Page;
