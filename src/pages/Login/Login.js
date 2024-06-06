import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Alert  } from '@mui/material';
import axios from 'axios';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { control, handleSubmit, setError, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_TODO_API_URL}/api-token-auth/`, data);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate("/list")
    } catch (error) {
      setError('apiError', { message: 'Invalid username or password' });
    }
  };

  return (
    <>
    <div className='flex flex-col justify-center items-center w-screen h-screen '>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col  w-6/12'>
      <div className='w-full flex justify-center items-center'>
        <p className='font-semibold text-xl'>Sign In to Your Account </p><LockIcon className='m-3'/>
      </div>
      <Controller
        name="username"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            className='w-full'
            label="Username"
            variant="outlined"
            margin="normal"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            className='w-full'
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
          />
        )}
      />
      {errors.apiError && (
          <Alert severity="error" className='mb-4'>
            {errors.apiError.message}
          </Alert>
        )}
      <Button type="submit" variant="contained" 
      className='w-3/12 !bg-green-400 text !normal-case !rounded-full !mt-3'>
        Login
      </Button>
    </form>
    </div>
    </>
  );
};

export default Login;
