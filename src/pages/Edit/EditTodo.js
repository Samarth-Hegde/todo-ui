import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Alert, AlertTitle } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchTodoById, useUpdateTodo } from '../../helpers/queries';

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: todo = {}, error, isLoading } = useFetchTodoById(id);
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const editMutation = useUpdateTodo();

  const [alert, setAlert] = useState({ open: false, message: '' });

  useEffect(() => {
    if (todo && Object.keys(todo).length > 0) {
      reset({
        title: todo.title,
        description: todo.description,
      });
    }
  }, [todo, reset]);

  const onSubmit = (data) => {
    editMutation.mutate(
      { todo: data, todo_id: id },
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Todo</h1>
      {alert.open && (
        <Alert severity="error" onClose={() => setAlert({ open: false, message: '' })}>
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

export default EditTodo;
