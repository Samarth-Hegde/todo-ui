import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Alert, AlertTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCreateTodo } from '../../helpers/queries';

const CreateTodo = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const createMutation = useCreateTodo();

  const [alert, setAlert] = useState({ open: false, message: '' });

  const onSubmit = (data) => {
    console.log("data",data)
    createMutation.mutate(
      { todo: data },
      {
        onSuccess: () => {
          navigate('/list');
        },
        onError: (error) => {
          setAlert({ open: true, message: error.message });
        },
      }
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Todo</h1>
      {alert.open && (
        <Alert className='mb-3' severity="error" onClose={() => setAlert({ open: false, message: '' })}>
          <AlertTitle>Error</AlertTitle>
          {alert.message}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: 'Title is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              variant="outlined"
              fullWidth
              className="mb-4"
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ''}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: 'Description is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ''}
            />
          )}
        />
        <Button type="submit" variant="contained" className="!bg-green-400">
          Save
        </Button>
      </form>
    </div>
  );
};

export default CreateTodo;
