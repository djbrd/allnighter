import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signin } from "../actions";

const schema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

export default function LocalSignIn() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/signin`,
        data
      );
      const { token } = res.data;
      dispatch(signin(token));
    } catch (e) {
      if (e.response.status === 422) {
        for (const fieldKey in e.response.data) {
          const msg = e.response.data[fieldKey];
          setError(fieldKey, { type: "manual", message: msg });
        }
      } else if (e.response.status === 401) {
        setError("password", { type: "manual", message: "Invalid password" });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="email">Email</label>
      <input type="text" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <label htmlFor="password">Password</label>
      <input type="password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <input type="submit" />
    </form>
  );
}
