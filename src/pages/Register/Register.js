import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Alert } from "@mui/material";
import axios from "axios";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [error,setError] = useState()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_TODO_API_URL}/register/users/`,
        data
      );
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      setError( {
        message: "Registration failed. Please try again.",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-6/12"
        >
          <div className="w-full flex justify-center items-center">
            <p className="font-semibold text-xl">Create a new account</p>
            <LockIcon className="m-3" />
          </div>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: "Username is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                className="w-full"
                label="Username"
                variant="outlined"
                margin="normal"
              />
            )}
          />
          {errors.username && <span>{errors.username.message}</span>}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                className="w-full"
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
              />
            )}
          />
          {error && (
            <Alert severity="error" className="mb-4">
              {error.message}
            </Alert>
          )}
          <div className="flex justify-between items-center">
            <Button
              type="submit"
              variant="contained"
              className="w-3/12 !bg-green-400 text !normal-case !rounded-full !mt-3"
            >
              Register
            </Button>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">
                login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
